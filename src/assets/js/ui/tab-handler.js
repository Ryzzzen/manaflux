/* Tab Handler */
$(document).ready(function() {
	$('.btn.tab').click(function() {
    navigationId = 0;

		$('.tabcontent').hide();
		$(`.tabcontent[data-tabid=${$(this).data('tabid')}][data-tabn=0]`).show();

		$('.tab').removeClass('active');
		$(this).addClass('active');

		/* Navigation Menus */
		if ($(`.tabcontent[data-tabid=${$(this).data('tabid')}][data-tabn=1]`).length) $('#nav-menu').show();
		else $('#nav-menu').hide();

		document.getElementById('selected').style.marginLeft = ($(this).offset().left + ($(this).width() / 2)) + 'px';
	}).eq(0).click();
});
