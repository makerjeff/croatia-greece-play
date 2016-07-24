/**
 * Created by jeffersonwu on 7/24/16.
 */

suite('"About" Page Tests', function(){
    test('page should contain link to contact page', function(){
        assert($('a[href="/contact"]').length);
    });
});
