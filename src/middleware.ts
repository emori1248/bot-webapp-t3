import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    ignoredRoutes: ["/api/hello"],
    publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};