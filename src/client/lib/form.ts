export default function form(config: any, cb: ()=> void, selector: string = '.ui.form') {
	var thisForm = $(selector).form(config).on('submit', ()=> {
		if(!thisForm.hasClass('error')) cb();
		return false;
	});
}