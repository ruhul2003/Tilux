/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "images.pexels.com" },
            { protocol: "https", hostname: "lh3.googleusercontent.com" },
            { protocol: "https", hostname: "ui-avatars.com" },
            { protocol: "https", hostname: "photoforprofile.com" },
            { protocol: "https", hostname: "image.com" },

        ],
    },
};

export default nextConfig;