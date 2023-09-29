import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    ignoredRoutes: ["/api/hello"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};