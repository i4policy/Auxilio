import Vue from 'vue';

const Bus = new Vue();

const events = {
  ON_FILE_ATTACHED: 'ON_FILE_ATTACHED ',
};

export { Bus, events };
