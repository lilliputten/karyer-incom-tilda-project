// prettier-ignore
const rubricTitles: Record<string, string> = {
  /* // NOTE: As on 2025.06.20, 19:28, added the following rubrics:
   * fixed-belt-conveyors: Универсальные ленточные конвейеры
   * truck-unloader: Разгрузчик грузовиков
   * radial-stacking-onveyor: Радиальный штабелирующий конвейер
   * models-telestackers: Модели телестакеров
   * solutions-for-stacking: Решения для штабелирования и погрузки сыпучих материалов
   */
  'bulk-reception-feeders': 'Бункеры для разгрузки самосвалов',
  'concrete': 'Производство цемента',
  'fixed-belt-conveyors': 'Универсальные ленточные конвейеры',
  'heap-leaching': 'Кучное выщелачивание',
  'link-conveyors': 'Промежуточные конвейеры',
  'mining': 'Горная промышленность',
  'mobile-hopper-feeders': 'Мобильные бункеры-питатели',
  'mobile-reclaimer-bunkers': 'Мобильные бункеры-реклаймеры',
  'models-telestackers': 'Модели телестакеров',
  'port-shiploading': 'Порты и терминалы',
  'power-stations': 'Энергетическая промышленность',
  'quarries': 'Карьеры и нерудная промышленность',
  'radial-stacking-onveyor': 'Радиальный штабелирующий конвейер',
  'radial-telescopic-conveyors': 'Радиальные телескопические стакеры',
  'rail-wagonloading': 'Загрузка и разгрузка вагонов',
  'ship-unloader': 'Системы разгрузки судов',
  'shiploaders': 'Судопогрузчики',
  'solutions-for-stacking': 'Решения для штабелирования и погрузки сыпучих материалов',
  'stockyard': 'Штабелирование',
  'track-mounted-conveyors': 'Конвейеры на гусеничном ходу',
  'truck-unloader': 'Разгрузчик грузовиков',
};

const tableTitle = 'Таблица данных';
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

function createTableRow(line: string, isHeader?: boolean) {
  const row = document.createElement('tr');
  row.classList.toggle('header', isHeader);
  const cellTag = isHeader ? 'th' : 'td';
  const items = line.split(';').map((s) => s.trim());
  items.forEach((s) => {
    const cell = document.createElement(cellTag);
    cell.innerText = quoteHtmlAttr(s);
    row.append(cell);
  });
  return row;
}

function processTable(node: HTMLElement) {
  const contentNode = node?.querySelector<HTMLElement>('.t-store__tabs__content');
  if (!contentNode) {
    return node;
  }
  const contentText = contentNode.innerHTML.trim();
  const lines = contentText
    .replace(/<br\s*\/>/g, '<br>')
    .split('<br>')
    .map((s) => s.trim())
    .filter(Boolean);
  const table = document.createElement('table');
  table.classList.add('StyledTable');
  try {
    lines.forEach((line, n) => {
      const row = createTableRow(line, n === 0);
      table.append(row);
    });
    contentNode.replaceChildren(table);
    contentNode.classList.add('TableWrapper');
    return node;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[StoreProduct:processTable]', err.message, {
      err,
      lines,
      contentText,
      node,
    });
    debugger; // eslint-disable-line no-debugger
    return node;
  }
}

function createDetailsFromTabs(
  productNode: HTMLElement,
  leftColumn: HTMLElement,
  rightColumn: HTMLElement,
) {
  const wideColumn = productNode.querySelector<HTMLElement>('.js-store-tabs');
  const tabs = productNode.querySelectorAll<HTMLElement>(
    '.t-store__tabs__controls .t-store__tabs__button',
  );
  const nodes = productNode.querySelectorAll<HTMLElement>(
    '.t-store__tabs__list .t-store__tabs__item',
  );
  tabs.forEach((tab, idx) => {
    const title = tab.dataset.tabTitle;
    const isVideo = title === videoTitle;
    const isTable = title === tableTitle;
    const isFeatures = title === featuresTitle;
    if (!isTable && !isVideo && !isFeatures) {
      return;
    }
    const node = nodes[idx];
    const targetContainer = isTable ? wideColumn : isVideo ? leftColumn : rightColumn;
    const newNode = isTable ? processTable(node) : node;
    if (isTable) {
      // Place a table above the tab headers
      const wrapper = document.createElement('div');
      const parent = wideColumn.parentNode;
      wrapper.classList.add('ProducTableWrapper', 't-col', 't-col_12');
      wrapper.append(newNode);
      parent.insertBefore(wrapper, wideColumn);
    } else {
      // Just add the block to the appropriate column
      targetContainer.append(newNode);
    }
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

function cloneTitleToTheTop(productNode: HTMLElement) {
  const titleNode = productNode.querySelector<HTMLElement>('.t-store__prod-popup__title-wrapper');
  const wrapper = `
  <div class="t-container MobileTitle">
  </div>
  `;
  productNode.insertAdjacentHTML('afterbegin', wrapper);
  const mobileTitleNode = productNode.querySelector<HTMLElement>('.MobileTitle');
  mobileTitleNode.append(titleNode.cloneNode(true));
}

function initJsProductControlsSelect(productNode: HTMLElement) {
  const selectNode = productNode.querySelector<HTMLSelectElement>(
    '.js-product-controls-wrapper select',
  );
  if (!selectNode) {
    // TODO: Use observer to check when the content will be added?
    setTimeout(() => initJsProductControlsSelect(productNode), 500);
    return;
  }
  selectNode.size = 1;
  selectNode.addEventListener('focus', () => {
    const options = selectNode.querySelectorAll('option');
    selectNode.size = options.length;
  });
  selectNode.addEventListener('blur', () => {
    selectNode.size = 0;
  });
  selectNode.addEventListener('change', () => {
    selectNode.size = 1;
    selectNode.blur();
  });
}

function initThumbs(productNode: HTMLElement) {
  // t-slds__thumbsbullet-wrapper
  const wrapperNode = productNode.querySelector<HTMLElement>('.t-slds__thumbsbullet-wrapper');
  const items = wrapperNode?.querySelectorAll<HTMLElement>('.t-slds__bullet');
  // Do nothing if there no thumbnails at all or there are too many of them
  if (!items || items.length < 4 || items.length > 8) {
    return;
  }
  wrapperNode.classList.add('fit');
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
    cloneTitleToTheTop(productNode);
    initJsProductControlsSelect(productNode);
    initThumbs(productNode);
  }
}
