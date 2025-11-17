import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Esta linha diz ao Clerk que a página inicial "/" é pública
  // e não precisa de login. É isso que quebra o loop.
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};