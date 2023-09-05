// without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware";

// applies next-auth only to matching routes - can be regex
// Ref: https:\\nextjs.org\docs\app\building-your-application\routing\middleware
export const config = { matcher: ["/extra", "/cart"] };
