fixCommentingMarginForRtl = function() {
	var checkDisqus = setInterval(function() {
		if (document.querySelector('#dsq-comments')) {
			clearInterval(checkDisqus);
			var comments = document.querySelectorAll('#dsq-comments li');
			for (var i = 0; i < comments.length; i++) {
				var right = comments[i].style.marginRight;
				comments[i].style.marginRight = comments[i].style.marginLeft;
				comments[i].style.marginLeft = right;
			}
		}
	}, 200);
};