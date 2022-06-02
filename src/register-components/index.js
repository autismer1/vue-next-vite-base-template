import SvgIcon from 'components/svg-icon'
import {
  Button
  // Tab,
  // Tabs,
  // Step,
  // Steps,
  // Cell,
  // CellGroup,
  // Col,
  // Row,
  // Field
} from 'vant'

const components = [
  SvgIcon,
  Button
  // Tab,
  // Tabs,
  // Step,
  // Steps,
  // Cell,
  // CellGroup,
  // Col,
  // Row,
  // Field
]

export default function (Vue) {
  for (const cpn of components) {
    Vue.component(cpn.name, cpn)
  }
}
