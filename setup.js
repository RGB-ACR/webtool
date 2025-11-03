document.querySelectorAll('details').forEach((det)=>{
const sum = det.querySelector('summary');
const content = det.querySelector('.detail-content');
if(!sum || !content) return;

const T = 'max-height .3s ease, opacity .25s ease, transform .3s ease';

function openAnim(){
	content.style.transition = 'none';
	content.style.willChange = 'max-height, opacity, transform';
	content.style.maxHeight = '0px';
	content.style.opacity   = '0';
	content.style.transform = 'translateY(-10px)';

	content.offsetHeight;
	requestAnimationFrame(()=>{
		content.style.transition = T;

		const h = content.scrollHeight;
		content.style.maxHeight = h + 'px';
		content.style.opacity   = '1';
		content.style.transform = 'translateY(0)';

		const onEnd = (e)=>{
			if(e.propertyName !== 'max-height') return;
			content.style.maxHeight = 'none';
			content.style.willChange = '';
			content.removeEventListener('transitionend', onEnd);
		};
		content.addEventListener('transitionend', onEnd);
	});
}

function closeAnim(){
	const h = content.scrollHeight;
	content.style.transition = 'none';
	content.style.willChange = 'max-height, opacity, transform';
	content.style.maxHeight = h + 'px';
	content.style.opacity   = '1';
	content.style.transform = 'translateY(0)';
	content.offsetHeight;

	requestAnimationFrame(()=>{
		content.style.transition = T;
		content.style.maxHeight = '0px';
		content.style.opacity   = '0';
		content.style.transform = 'translateY(-10px)';

		const onEnd = (e)=>{
			if(e.propertyName !== 'max-height') return;
			det.open = false;
			content.style.willChange = '';
			content.removeEventListener('transitionend', onEnd);
		};
		content.addEventListener('transitionend', onEnd);
	});
}

det.addEventListener('toggle', () => {
	if(det.open){
		openAnim();
	}
});

sum.addEventListener('click', (ev) => {
	if(!det.open) return;
	ev.preventDefault();
	closeAnim();
});

const mo = new MutationObserver(()=>{
	if(det.open && content.style.maxHeight !== 'none'){
		content.style.maxHeight = content.scrollHeight + 'px';
	}
});
mo.observe(content, {subtree:true, childList:true});
});
