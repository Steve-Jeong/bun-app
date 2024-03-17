FROM oven/bun:1.0.30-alpine
WORKDIR /app
ARG NODE_ENV
COPY package*.* bun.lockb ./
RUN bun install
RUN echo $NODE_ENV > /nodeenv.txt
RUN if [ "$NODE_ENV" = "development" ]; \
  then echo 'it is in the development mode' > /env.txt; \
  else echo 'it is not in the development mode' > /env.txt; \
fi
# RUN if [ "$NODE_ENV" = "development" ]; \
#   then bun install; \
#   else bun install --production; \
# fi
# RUN if [ "$NODE_ENV" = "development" ]; \
#   then echo "development mode"; \
#   else echo "production mode"; \
#   fi
COPY . .
# Set permissions
RUN chown -R bun:bun /app
# Set user. 위 chown에 지정된 user/group과 같아야 한다.
USER bun
ENV PORT=$PORT
EXPOSE $PORT
CMD ["bun", "run", "dev"]