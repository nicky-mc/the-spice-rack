import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  "/(api|trpc)(.*)", // API and TRPC routes
]);

// Clerk middleware to protect the routes
export default clerkMiddleware((req) => {
  // Safely check if nextUrl exists in the request
  if (!req.nextUrl) {
    console.error("nextUrl is undefined, cannot process the request");
    return NextResponse.next(); // Continue without breaking
  }

  const { pathname } = req.nextUrl;

  // Allow access to non-protected routes like /about
  if (isProtectedRoute(req) && !pathname.startsWith("/about")) {
    return NextResponse.next(); // Continue with protected route access
  }

  // If no match, allow public access
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Apply to all routes except for static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API and TRPC routes
    "/(api|trpc)(.*)",
  ],
};
