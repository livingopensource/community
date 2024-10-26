import { env } from '$env/dynamic/private';
export async function load() {
    return {
        streamURL: env.StreamURL
    }
}