# ---------- Stage 1: Build Frontend ----------
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# ⚡ 1. 使用国内 npm 镜像源（极大提升构建速度）
RUN npm config set registry https://registry.npmmirror.com/

# ⚡ 优化：先复制 package.json 和 pnpm-lock.yaml（利用缓存）
COPY package*.json pnpm-lock.yaml* ./

# ⚡ 2. 安装依赖（npm ci 更适合生产构建，--legacy-peer-deps 防止依赖冲突）
RUN npm ci --legacy-peer-deps

# 再复制项目源文件（这样代码改变时不会重新安装依赖）
COPY . .

# ⚡ 3. 构建前端产物（React 默认输出 build，Vue 通常是 dist）
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:stable-alpine

# 复制构建结果到 nginx 静态目录
COPY --from=build /app/dist /usr/share/nginx/html

# ⚡ 4.（可选）如果你的框架输出到 build 文件夹，请改成 /app/build
# COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
