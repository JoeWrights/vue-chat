import vue from 'vue';
import {
  Button,
  Input,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Container,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DatePicker,
  Aside,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Menu,
  Main,
  Footer,
  Table,
  TableColumn,
  Popover,
  Select,
  Option,
  Dialog,
  RadioGroup,
  Radio,
  Autocomplete,
  MessageBox,
} from 'element-ui';

function plugin(Vue) {
  Vue.component(Button.name, Button);
  Vue.component(Input.name, Input);
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPane.name, TabPane);
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
  Vue.component(Container.name, Container);
  Vue.component(Header.name, Header);
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(Aside.name, Aside);
  Vue.component(Submenu.name, Submenu);
  Vue.component(MenuItemGroup.name, MenuItemGroup);
  Vue.component(MenuItem.name, MenuItem);
  Vue.component(Menu.name, Menu);
  Vue.component(Main.name, Main);
  Vue.component(DropdownItem.name, DropdownItem);
  Vue.component(Footer.name, Footer);
  Vue.component(Table.name, Table);
  Vue.component(TableColumn.name, TableColumn);
  Vue.component(Popover.name, Popover);
  Vue.component(Select.name, Select);
  Vue.component(Option.name, Option);
  Vue.component(Dialog.name, Dialog);
  Vue.component(RadioGroup.name, RadioGroup);
  Vue.component(Radio.name, Radio);
  Vue.component(Autocomplete.name, Autocomplete);
  Vue.component(MessageBox.name, MessageBox);
}

vue.prototype.$confirm = MessageBox.confirm;

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
