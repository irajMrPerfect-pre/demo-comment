(function () {
    angular.module('comments', []).controller('commentsCtrl', function ($scope, $sce) {
        var postAuthorEmail;
        postAuthorEmail = 'jan.kanty.pawelski@gmail.com';
        $scope.comments = [];
        $scope.newComment = {
            id: '',
            author: {
                name: '',
                email: '',
                website: ''
            },
            content: '',
            loved: ''
        };
        $scope.parseContent = function (content) {
            return $sce.trustAsHtml(content);
        };
        $scope.isAuthor = function (email) {
            return email === postAuthorEmail;
        };
        $scope.getGravatar = function (email) {
            var hash;
            if (email === void 0) {
                email = '';
            }
            hash = email.trim();
            hash = hash.toLowerCase();
            hash = md5(hash);
            return '//gravatar.com/avatar/' + hash + '?s=60&d=identicon';
        };
        $scope.love = function (commentId) {
            var comment, i, len, ref, results;
            ref = $scope.comments;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                comment = ref[i];
                if (comment.id === commentId) {
                    results.push(comment.loved = !comment.loved);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };
        $scope.reply = function (author) {
            if ($scope.newComment.content === void 0) {
                $scope.newComment.content = '';
            }
            if ($scope.newComment.content.search('@' + author + '@') === -1) {
                if ($scope.newComment.content[0] === '@') {
                    $scope.newComment.content = ', ' + $scope.newComment.content;
                } else {
                    $scope.newComment.content = ' ' + $scope.newComment.content;
                }
                return $scope.newComment.content = '@' + author + '@' + $scope.newComment.content;
            }
        };
        $scope.addNewComment = function () {
            var notEmpty;
            notEmpty = {
                name: $scope.newComment.author.name.length > 0,
                email: $scope.newComment.author.email.length > 0,
                content: $scope.newComment.content.length > 0
            };
            if (notEmpty.name && notEmpty.email && notEmpty.content) {
                $scope.newComment.id = $scope.comments.length + 1;
                $scope.newComment.author.website = $scope.newComment.author.website.replace(/https?:\/\/(www.)?/, '');
                $scope.newComment.content = $scope.newComment.content.replace(/(@[^@.]+)@/, '<span class="reply">$1</span>');
                $scope.newComment.content = $scope.newComment.content.replace(/https?:\/\/(www.)?([a-zA-Z0-9\-_]+\.[a-zA-Z0-9]+)/, '<a href="//$2">$2</a>');
                $scope.newComment.loved = false;
                $scope.comments.push($scope.newComment);
                return $scope.newComment = {};
            }
        };
        return $scope.$watch('newComment.email', function (newValue, oldValue) {
            var newCommentAvatar;
            newCommentAvatar = document.getElementById('newCommentAvatar');
            return newCommentAvatar.src = $scope.getGravatar($scope.newComment.email);
        });
    });

}).call(this);

