import { Filter } from "../../types";
import style from "./filter.module.css";

const FilterView = (props: Filter) => {
  const styleProps = {
    backgroundColor: props.color,
    opacity: props.opacity
  };

  return <div className={style.filter} style={styleProps}></div>;
};

export default FilterView;