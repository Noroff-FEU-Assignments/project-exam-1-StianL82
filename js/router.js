import * as pages from "./pages/index.js";

export async function router() {

  switch (window.location.pathname) {
    //HomePage
    case "/":
    case "/index.html":
    await pages.homePage()
    break;
    //Blogpost Page
    case "/blogpost/":
    case "/blogpost":
    case "/blogpost.html":
    await pages.blogPostPage()
    break;
    //Blogspage
    case "/blogspage/":
    case "/blogspage":
    case "/blogspage.html":
    await pages.blogsPage()
    break;
    //AboutPage
    case "/about/":
    case "/about":
    case "/about.html":
      await pages.aboutPage()
      break;
    //ContactPage
    case "/contact/":
    case "/contact":
    case "/contact.html":
    await pages.contactPage()
    break;

    default:
      console.log("404 - not found")
  }
}