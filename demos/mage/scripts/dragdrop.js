function allowDrop(ev)
{
	ev.preventDefault();
}

function drag(ev)
{
	ev.dataTransfer.setData("object", ev.target.id)
}

function drop(ev)
{
	ev.preventDefault();
	var data = ev.dataTransfer.getData("object");
	ev.target.appendChild(document.getElementById(data));
	document.getElementById('sfx_click').play();

}