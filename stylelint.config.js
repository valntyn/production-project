module.exports = {
    plugins: ['stylelint-scss'],
    rules: {
        'rule-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['after-comment', 'inside-block'],
                ignoreAtRules: ['import'],
            },
        ],
    },
};
