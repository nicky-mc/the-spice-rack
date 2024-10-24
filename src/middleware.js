import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that do not require authentication
const isPublicRoute = createRouteMatcher([
  "/about",
  "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  "/(api|trpc)(.*)",
]);

// Use clerkMiddleware to protect the routes
export default clerkMiddleware((req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  return NextResponse.redirect("/sign-in");
});

export const config = {
  // The matcher will find matches for public and private routes
  // If the match is for a public route, middleware does not trigger  import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
  import { NextResponse } from "next/server";
  
  // Define public routes that do not require authentication
  const isPublicRoute = createRouteMatcher([
    "/about",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ]);
  
  // Use clerkMiddleware to protect the routes
  export default clerkMiddleware((req) => {
    if (isPublicRoute(req)) {
      return NextResponse.next();
    }
    return NextResponse.redirect("/sign-in");
  });
  
  export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
      // Always run for API routes
      "/(api|trpc)(.*)",
    ],
  };
  // If the match is for a private route, middleware will trigger with authentication
  // The matcher uses regex to find matches
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
