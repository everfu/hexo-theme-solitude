const moment = require('moment');

hexo.extend.helper.register('getArchiveLength', function (type = 'year') {
    const validTypes = ['year', 'month'];
    type = validTypes.includes(type) ? type : 'year';

    return this.site.posts.sort('-date').data.reduce((archive, post) => {
        const postdate = moment(post.date).format(type === 'year' ? 'YYYY' : 'YYYY/MM');
        archive[postdate] = (archive[postdate] || 0) + 1;
        return archive;
    }, {});
});
