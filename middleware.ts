import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes need protection
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Protect dashboard and everything inside it
]);

export default clerkMiddleware(async (auth, req) => {
  // If user tries to go to dashboard, check if they are logged in
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};