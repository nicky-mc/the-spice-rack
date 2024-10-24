import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  "/(api|trpc)(.*)",
]);

// Use clerkMiddleware to protect the routes
export default clerkMiddleware((req) => {
  if (isProtectedRoute(req) && !req.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.next();
  }
  return NextResponse.next();
});

export const config = {
  // The matcher will find matches for public and private routes
  // If the match is for a public route, middleware does not trigger
  // If the match is for a private route, middleware will trigger with authentication
  // The matcher uses regex to find matches
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
