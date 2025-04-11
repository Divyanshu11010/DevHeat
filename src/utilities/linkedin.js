import { UnipileClient } from "unipile-node-sdk";
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const account_id = process.env.account_id;

/**
 * Reduces raw LinkedIn posts data for engagement analysis.
 * @param {Object} rawData - The raw data object returned by Unipile.
 * @returns {Object} Reduced post data and summary.
 */
function reduceLinkedInData(rawData) {
    const reducedPosts = rawData.items.map(post => {
        const {
            id,
            parsed_datetime,
            is_repost,
            text,
            author,
            reposted_by,
            reaction_counter,
            comment_counter,
            repost_counter,
            attachments,
            share_url
        } = post;

        return {
            post_id: id,
            date: parsed_datetime.split('T')[0],
            is_repost,
            author: is_repost ? author?.name : reposted_by?.name || author?.name,
            reposted_by: is_repost ? reposted_by?.name || null : null,
            text_snippet: text.length > 70 ? text.slice(0, 70) + "..." : text,
            reactions: reaction_counter,
            comments: comment_counter,
            reposts: repost_counter,
            attachments_count: Array.isArray(attachments) ? attachments.length : 0,
            share_url
        };
    });

    // Sort posts by date (descending)
    const sortedDates = reducedPosts
        .map(post => new Date(post.date))
        .sort((a, b) => a - b);

    const firstPostDate = sortedDates[0];
    const lastPostDate = sortedDates[sortedDates.length - 1];

    const totalDaysActive = Math.max(
        Math.ceil((lastPostDate - firstPostDate) / (1000 * 60 * 60 * 24)),
        1
    );

    const totalWeeksActive = totalDaysActive / 7;

    const summary = reducedPosts.reduce(
        (acc, post) => {
            acc.total_posts += 1;
            if (post.is_repost) acc.reposts += 1;
            else acc.original_posts += 1;

            acc.total_reactions += post.reactions;
            acc.total_comments += post.comments;
            acc.total_reposts += post.reposts;

            return acc;
        },
        {
            total_posts: 0,
            original_posts: 0,
            reposts: 0,
            total_reactions: 0,
            total_comments: 0,
            total_reposts: 0
        }
    );

    summary.average_engagement_per_post = {
        reactions: summary.total_posts ? summary.total_reactions / summary.total_posts : 0,
        comments: summary.total_posts ? summary.total_comments / summary.total_posts : 0,
        reposts: summary.total_posts ? summary.total_reposts / summary.total_posts : 0
    };

    summary.post_frequency = {
        first_post_date: firstPostDate.toISOString().split('T')[0],
        last_post_date: lastPostDate.toISOString().split('T')[0],
        days_active: totalDaysActive,
        posts_per_day: +(summary.total_posts / totalDaysActive).toFixed(2),
        posts_per_week: +(summary.total_posts / totalWeeksActive).toFixed(2)
    };

    return {
        posts: reducedPosts,
        summary
    };
}

/**
 * Fetches LinkedIn profile and posts from Unipile and reduces them.
 * @param {string} linkedinHandle - Public LinkedIn handle of the user.
 * @returns {Object} Reduced engagement data.
 */
async function getUnipileProfile(linkedinHandle) {
    try {
        const client = new UnipileClient(BASE_URL, ACCESS_TOKEN);

        const profile = await client.users.getProfile({
            account_id,
            identifier: linkedinHandle,
        });

        const internalId = profile?.provider_id;
        if (!internalId) {
            throw new Error("E009 : Internal LinkedIn ID not found in profile.");
        }

        const posts = await client.users.getAllPosts({
            account_id,
            identifier: internalId,
        });

        const reducedData = reduceLinkedInData(posts);
        return reducedData;
    } catch (error) {
        console.error("E010 : Error fetching or reducing posts:", error);
    }
}

export default getUnipileProfile;