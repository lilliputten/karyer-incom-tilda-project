function addBreadcrumbs(rootNode: HTMLElement) {
  const url = window.location.pathname;
  const match = url.match(/^(.*)\/(tpost\/.*)$/);
  const [_, newsUrl = '/news'] = match;
  const code = `
<div id="rec862961736" class="r t-rec t-rec_pt_60 t-rec_pb_60 uc-PageBreadcrumbs">
  <div class="t758">
    <div class="t-container">
      <div class="t758__col t-col t-col_12 ">
        <div class="t758__wrapper t-align_left">
          <ul class="t758__list">
            <li class="t758__list_item">
              <div class="t758__link-item__wrapper">
                <a class="t-menu__link-item" href="/">
                  Главная
                </a>
              </div>
              <span class="t758__breadcrumb-divider">»</span>
            </li>
            <li class="t758__list_item">
              <div class="t758__link-item__wrapper">
                <a class="t-menu__link-item t758__link-item_active" href="${newsUrl}">
                  Новости
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
  rootNode.insertAdjacentHTML('afterbegin', code);
  rootNode.style.paddingTop = '0';
}

function initNewsPageActions(rootNode: HTMLElement) {
  const newsNode = document.querySelector<HTMLElement>('.uc-NewsPageActions .t142A');
  if (newsNode) {
    newsNode.classList.add('Buttons', 'News');
    rootNode.append(newsNode);
    // const btns = newsNode.querySelectorAll('.t-btn');
    // btns[0]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-gift"></i> ');
  }
}

export function initNews() {
  // const rootNode = document.querySelector<HTMLElement>('.t-feed__post-popup__container');
  const rootNode = document.querySelector<HTMLElement>('.t-feed__post-popup__content');
  if (rootNode) {
    addBreadcrumbs(rootNode);
    initNewsPageActions(rootNode);
  }
}
