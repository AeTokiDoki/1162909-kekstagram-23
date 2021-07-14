import {
  ALERT_SHOW_TIME
} from './service/index.js';

/**
 * Принимает диапазон чисел.
 * @returns случайное положительное число.
 */
export const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Принимает данные строки и максимально допустимую длину, вычисляет длину строки.
 * @returns true / false.
 */
export const checkStringLength = (string, length) => string.length <= length;

/**
 * Принимает данные массива. Создаёт случайное число. Проверяет присутствует ли он в массиве и генерирует новое число.
 * @returns случайное уникальное число.
 */
const getRandomUnicNumber = (min, max, array) => {
  const number = getRandomPositiveInteger(min, max);
  if (array.includes(number)) {
    return getRandomUnicNumber(min, max, array);
  }
  return number;
};

const returnNewArray = (length) => new Array(length).fill();

/**
 * Принимает диапазон чисел и длину массива.
 * @returns массив случайных чисел.
 */
export const getArrayOfRandomNumbers = (min, max, length) => {
  const returnedArray = returnNewArray(length);
  returnedArray.forEach((item, index) => {
    returnedArray[index] = getRandomUnicNumber(min, max, returnedArray);
  });

  return returnedArray;
};

/**
 * Принимает id и array
 * @returns  массив уникальных id, с учётом id базового элемента.
 */
export const getArrayNumbersFromId = (array, id) => array.map((number) => id * 100 + number);

/**
 * Принимает массив.
 * @returns Случайный элемент из массива.
 */
export const getRandomElementFromArray = (array) => array[getRandomPositiveInteger(1, array.length - 1)];

/**
 * Принимает данные функции, массив ids, длину массива. Создаёт пустой массив , запускает процесс создания нового массива на основе текущего.
 * @returns возвращает массив значений.
 */
export const getArrayFromFunctionCall = (func, ids, length) => {
  if (ids.length < length) {
    throw new Error('Длина массива айдишников меньше ожидаемой длины возвращаемого массива');
  }
  return returnNewArray(length).map(
    (item, index) => func(ids[index]),
  );
};

/**
 * Принимает node и  узел
 * @returns Добавляет ноду в узел
 */
export const renderElement = (root, node) => root.appendChild(node);

/**
 *Принимает node и узел
 *Сначала очищает, затем вставляет полученные узлы (nodes) в DOM .
 */
export const renderStringNodes = (root, nodesByString) => {
  root.textContent = '';
  root.insertAdjacentHTML(
    'beforeend',
    nodesByString,
  );
};

/**
 * Принимает массив nodes
 * @returns создаёт фрагмент с nodes
 */
export const createNodesFragment = (nodes) => {
  const fragment = document.createDocumentFragment();

  nodes.forEach((node) => {
    fragment.appendChild(node);
  });

  return fragment;
};


export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
