FROM node:8.11-alpine
RUN npm config set registry https://registry.npm.taobao.org
ADD . samgeeker
WORKDIR /samgeeker
RUN npm run docker
EXPOSE 6888
CMD ["npm", "run", "start"]