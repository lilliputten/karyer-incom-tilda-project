// prettier-ignore
const rubricTitles: Record<string, string> = {
  'shiploaders': 'Судопогрузчики',
  'radial-telescopic-conveyors': 'Радиальные телескопические стакеры',
  'track-mounted-conveyors': 'Конвейеры на гусеничном ходу',
  'bulk-reception-feeders': 'Бункеры для разгрузки самосвалов',
  'mobile-hopper-feeders': 'Мобильные бункеры-питатели',
  'mobile-reclaimer-bunkers': 'Мобильные бункеры-реклаймеры',
  'ship-unloader': 'Системы разгрузки судов',
  'link-conveyors': 'Промежуточные конвейеры',
  'port-shiploading': 'Порты и терминалы',
  'quarries': 'Карьеры и нерудная промышленность',
  'mining': 'Горная промышленность',
  'rail-wagonloading': 'Загрузка и разгрузка вагонов',
  'stockyard': 'Штабелирование',
  'power-stations': 'Энергетическая промышленность',
  'concrete': 'Производство цемента',
  'heap-leaching': 'Кучное выщелачивание',
};

const videoTitle = 'Видео';
const featuresTitle = 'Основные преимущества';

export function quoteHtmlAttr(str: string, preserveCR?: boolean) {
  const crValue = preserveCR ? '&#13;' : '\n';
  return (
    String(str) // Forces the conversion to string
      .replace(/&/g, '&amp;') // This MUST be the 1st replacement
      .replace(/'/g, '&apos;') // The 4 other predefined entities, required
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // You may add other replacements here for HTML only (but it's not
      // necessary). Or for XML, only if the named entities are defined in its
      // DTD.
      .replace(/\r\n/g, crValue) // Must be before the next replacement
      .replace(/[\r\n]/g, crValue)
  );
}

function addBreadcrumbs(rootNode: HTMLElement) {
  const url = window.location.pathname;
  const match = url.match(/^((.*)\/([A-z0-9_-]+))\/(tproduct\/.*)$/);
  const [
    _,
    rubricUrl,
    productsUrl = '/products',
    rubricId = '',
    // itemUrl,
  ] = match;
  const rubricTitle = quoteHtmlAttr(rubricTitles[rubricId] || 'Раздел');
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
                <a class="t-menu__link-item t758__link-item_active" href="${productsUrl}">
                  Продукция
                </a>
              </div>
              <span class="t758__breadcrumb-divider">»</span>
            </li>
            <li class="t758__list_item">
              <div class="t758__link-item__wrapper">
                <a class="t-menu__link-item t758__link-item_active" href="${rubricUrl}">
                  ${rubricTitle}
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
  rootNode.insertAdjacentHTML('beforebegin', code);
  rootNode.style.paddingTop = '0';
}

function createDetailsFromTabs(
  productNode: HTMLElement,
  leftColumn: HTMLElement,
  rightColumn: HTMLElement,
) {
  const tabs = productNode.querySelectorAll<HTMLElement>(
    '.t-store__tabs__controls .t-store__tabs__button',
  );
  const nodes = productNode.querySelectorAll<HTMLElement>(
    '.t-store__tabs__list .t-store__tabs__item',
  );
  tabs.forEach((tab, idx) => {
    const title = tab.dataset.tabTitle;
    const isVideo = title === videoTitle;
    const isFeatures = title === featuresTitle;
    if (!isVideo && !isFeatures) {
      return;
    }
    const node = nodes[idx];
    const targetContainer = isVideo ? leftColumn : rightColumn;
    targetContainer.append(node);
    tab.remove();
    // tab.style.display = 'none';
  });
}

function appendActionsAndLabels(rightColumn: HTMLElement) {
  const badgesNode = document.querySelector<HTMLElement>('.uc-ProductBadges .t142A');
  if (badgesNode) {
    badgesNode.classList.add('Buttons', 'Badges');
    rightColumn.append(badgesNode);
    const btns = badgesNode.querySelectorAll('.t-btn');
    btns[0]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-gift"></i> ');
  }
  const actionsNode = document.querySelector<HTMLElement>('.uc-ProductActions .t142A');
  if (actionsNode) {
    actionsNode.classList.add('Buttons', 'Actions');
    rightColumn.append(actionsNode);
    const btns = actionsNode.querySelectorAll('.t-btn');
    btns[0]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-shopping-cart"></i> ');
    btns[1]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-bolt"></i> ');
    btns[2]?.insertAdjacentHTML('afterbegin', '<i class="fa fa-gift"></i> ');
  }
}

function addProductTitleToForms() {
  const productTitle = quoteHtmlAttr(document.title);
  const formFields = [
    document.querySelector('.uc-OrderProductForm form input[name="tildaspec-formname"]'),
    document.querySelector('.uc-GetKPForm form input[name="tildaspec-formname"]'),
  ];
  formFields.forEach((it: HTMLInputElement) => {
    it.value += ': ' + productTitle;
  });
}

export function initStoreProduct() {
  const rootNode = document.querySelector<HTMLElement>('.t-rec > .t-store');
  const productNode = rootNode?.querySelector<HTMLElement>('.js-store-product.js-product');
  if (rootNode && productNode) {
    //Only if product page has been found, else do nothing
    const leftColumn = productNode.querySelector<HTMLElement>('.t-store__prod-popup__col-left');
    const rightColumn = productNode.querySelector<HTMLElement>('.t-store__prod-popup__col-right');
    addBreadcrumbs(rootNode);
    createDetailsFromTabs(productNode, leftColumn, rightColumn);
    appendActionsAndLabels(rightColumn);
    addProductTitleToForms();
  }
}
