export default async function handler(req, res) {

    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    try {

        const response = await fetch(`${url}/incr/portfolio-visits`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        res.status(200).json({
            count: data.result
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}