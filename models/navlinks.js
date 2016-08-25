/**
 * Created by jeffersonwu on 8/4/16.
 * data for navigation
 */

var navlinks = {
    links: [
        {text: 'home', url: '/', alt: 'The main page.', meadowlark: true},
        {text: 'about', url: '/about', alt: 'About page.', meadowlark: true},
        {text: 'newsletter', url: '/newsletter', alt: 'Newsletter sign-up, traditional style.', meadowlark: true},
        {text: 'newsletter (ajax)', url: '/newsletter-ajax', alt: 'Newsletter sign-up, AJAX style!'},
        {text: 'blocks', url:'/blocks', alt: 'Learning about blocks.'},
        {text: 'nursery', url: '/nursery', alt: 'Nursery learnings.'},
        {text: 'vacations', url: '/vacations', alt: 'Vacations'},
        {text: 'headers', url:'/headers', alt: 'Headers debugging page.', debug: true},
        {text: 'add people', url: '/add-people', alt: 'add people as a test', debug: true},
        {text: 'view people', url: '/view-people', alt: 'view list of people', info: true},
        {text: 'list-o-peeps (hb front-end)', url: '/list-o-people', alt: 'see a list of people, but using front end templating', info: true}
    ]
};

exports.getNavLinks = function() {
    return navlinks;
};