import wizard from '../components/wizard.vue';
import dashboard from '../components/dashboard.vue';

module.exports = {
    '/': {
        component: wizard
    },
    'dashboard': {
        component: dashboard,
        device: true
    }

};