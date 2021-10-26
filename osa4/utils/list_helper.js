const blog = require("../models/blog")

const dummy = (blogs) => {
    // ...
    return 1
  }

  const totalLikes =(blogs) => {
    const reducer = (sum, blogs) => {
        return sum + blogs.likes
      }
      return blogs.length === 0
        ? 0 
        : blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
  const blogWythMostLikes = blogs.map(blog => blog.likes)
  var indexOfMaxValue = blogWythMostLikes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  return blogs[indexOfMaxValue]
}

const mostBlogs = (blogs) => {

  let apunimi = ''
  let apumaara = 0
  let mostNimi = ''
  let mostMaara = 0
  
  // sortataan nimen perusteella
  const sortedBlog = blogs.sort((a, b) => {
    let fa = a.author.toLowerCase(),
        fb = b.author.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });

  for(let item in sortedBlog){
    if (sortedBlog[item].author !== apunimi) {
      apunimi = sortedBlog[item].author
      apumaara = 1
    } // if
    else {
      apumaara = apumaara +1
      if (apumaara > mostMaara) {
        mostNimi = sortedBlog[item].author
        mostMaara = apumaara
      }
    } // else
  } // for
  let nimiMaara = {author: mostNimi, blogs: mostMaara}
  
  return (nimiMaara)
} // mostBlogs

const mostLikes = (blogs) => {

  let apunimi = ''
  let apulikes = 0
  let mostNimi = ''
  let mostLikes = 0
  
  // sortataan nimen perusteella
  const sortedBlog = blogs.sort((a, b) => {
    let fa = a.author.toLowerCase(),
        fb = b.author.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });

  for(let item in sortedBlog){
    if (sortedBlog[item].author !== apunimi) {
      apunimi = sortedBlog[item].author
      apulikes = sortedBlog[item].likes
      if (apulikes > mostLikes) {
        mostNimi = sortedBlog[item].author
        mostLikes = apulikes
      }
    } // if
    else {
      apulikes = apulikes + sortedBlog[item].likes
      if (apulikes > mostLikes) {
        mostNimi = sortedBlog[item].author
        mostLikes = apulikes
      }
    } // else
  } // for
  let nimiLikes = {author: mostNimi, likes: mostLikes}
  
  return (nimiLikes)
} // mostBlogs

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }