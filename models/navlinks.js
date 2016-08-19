/**
 * Created by jeffersonwu on 8/4/16.
 * data for navigation
 */

var navlinks = {
    links: [
        {text: 'home', url: '/', alt: 'The main page.'},
        {text: 'about', url: '/about', alt: 'About page.'},
        {text: 'newsletter', url: '/newsletter', alt: 'Newsletter sign-up, traditional style.'},
        {text: 'newsletter (ajax)', url: '/newsletter-ajax', alt: 'Newsletter sign-up, AJAX style!'},
        {text: 'blocks', url:'/blocks', alt: 'Learning about blocks.'},
        {text: 'nursery', url: '/nursery', alt: 'Nursery learnings.'},
        {text: 'vacations', url: '/vacations', alt: 'Vacations'},
        {text: 'headers', url:'/headers', alt: 'Headers debugging page.', debug: true}
    ]
};

exports.getNavLinks = function() {
    return navlinks;
};

//TODO: NOT WORKING, FIX IT.
