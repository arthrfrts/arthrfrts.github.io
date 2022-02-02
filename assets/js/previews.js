let opacityTimeout;
let contentTimeout;
let transitionDurationMs = 100;

function hideTooltip() {
  opacityTimeout = setTimeout(() => {
    tooltipWrapper.style.opacity = 0;

    contentTimeout = setTimeout(() => {
      tooltipContent.innerHTML = "";
      tooltipWrapper.style.display = "none";
    }, transitionDurationMs + 1);
  }, transitionDurationMs);
}

function showTooltip(event) {
  const elem = event.target;
  const elem_props = elem.getClientRects()[elem.getClientRects().length - 1];
  const top = window.pageYOffset || document.documentElement.scrollTop;

  if (elem.host == window.location.host) {

    iframe.src = event.target.href;

    iframe.onload = () => {
      tooltipContentHtml = ""
      tooltipContentHtml += `
        <strong class="tooltip-title">${iframe.contentWindow.document.querySelector('h1').innerHTML}</strong>
      `;

      tooltipContentHtml += iframe.contentWindow.document.querySelector('.content-body').innerHTML;

      tooltipContent.innerHTML = tooltipContentHtml;

      tooltipWrapper.style.display = "block";

      setTimeout(() => {
        tooltipWrapper.style.opacity = 1;
      });
    };

    tooltipWrapper.style.left = elem_props.left - (tooltipWrapper.offsetWidth / 2) + (elem_props.width / 2) + "px";
    if ((window.innerHeight - elem_props.top) < (tooltipWrapper.offsetHeight)) {
      tooltipWrapper.style.top = elem_props.top + top - tooltipWrapper.offsetHeight - 10 + "px";
    } else if ((window.innerHeight - elem_props.top) > (tooltipWrapper.offsetHeight)) {
      tooltipWrapper.style.top = elem_props.top + top + 35 + "px";
    }

    if ((elem_props.left + (elem_props.width / 2)) < (tooltipWrapper.offsetWidth / 2)) {
      tooltipWrapper.style.left = "10px";
    } else if ((document.body.clientWidth - elem_props.left - (elem_props.width / 2)) < (tooltipWrapper.offsetWidth / 2)) {
      tooltipWrapper.style.left = document.body.clientWidth - tooltipWrapper.offsetWidth - 20 + "px";
    }
  }
}
