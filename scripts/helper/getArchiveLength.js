const moment = require('moment')

hexo.extend.helper.register('getArchiveLength', function (type) {
    if (type !== 'year' && type !== 'month') {
        type = 'year';
    }
    const posts = this.site.posts.sort('-date').data
    let archive = {}
    for (const post of posts) {
        const postdate = type === 'year' ? moment(post.date).format('YYYY') : moment(post.date).format('YYYY/MM');
        archive[postdate] = (archive[postdate] || 0) + 1;
    }
    return archive;
});