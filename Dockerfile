FROM nginx:alpine

# Copy the build artifacts
COPY dist /usr/share/nginx/html

# Download the large hero video directly on the VPS during build to avoid API upload limits
RUN apk add --no-cache wget && \
    mkdir -p /usr/share/nginx/html/hero && \
    wget -O /usr/share/nginx/html/hero/solarzap-hero-video-wvga.mp4 https://lp-solarzap-aceleracao.surge.sh/hero/solarzap-hero-video-wvga.mp4

# Replace the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
