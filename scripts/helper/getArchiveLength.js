const moment = require('moment')

hexo.extend.helper.register('getArchiveLength', function (type) {
    if (type !== 'year' && type !== 'month') {
        type = 'year';
    }
    const posts = this.site.posts.sort('-date').data
    let archive = {}
    posts.forEach(post => {
        const postdate = type === 'year' ? moment(post.date).format('YYYY') : moment(post.date).format('YYYY/MM');
        if(!archive[postdate]){
            archive[postdate] = 1
        } else {
            archive[postdate] ++
        }
    });
    return archive
});
