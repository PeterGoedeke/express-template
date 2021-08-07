# FROM node:14.17.1 as base

# # Add package file
# COPY package*.json ./

# # Install deps
# RUN npm i

# # Copy source
# COPY src ./src
# COPY prisma ./prisma
# COPY tsconfig.json ./tsconfig.json
# COPY tslint.json ./tslint.json

# # Build dist
# RUN npm run build

# ENV PORT=3000
# EXPOSE 3000
# CMD ["dist/index.js"]


# # Start production image build
# # FROM gcr.io/distroless/nodejs:14

# # # Copy node modules and build directory
# # COPY --from=base ./node_modules ./node_modules
# # COPY --from=base /dist /dist

# # Expose port 3000

FROM node:14
WORKDIR /app

COPY package.json ./

RUN npm i

COPY src ./src
COPY prisma ./prisma

COPY tsconfig.json ./tsconfig.json
COPY tslint.json ./tslint.json

RUN npm run build
RUN ls -R --ignore=node_modules

#Expose the right port
ENV PORT=3000
EXPOSE 3000

# Run our app
CMD ["node", "dist/index.js"]