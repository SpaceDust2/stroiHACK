import React from "react";
import { ViewMode } from "react-gantt-chart";
import styles from "./styles.module.css";

interface IProps {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
}

const ViewSwitcher = (props: IProps) => {
  const { onViewModeChange, onViewListChange, isChecked } = props;

  return (
    <div className={styles.ViewContainer}>
      <button className={styles.Button} onClick={() => onViewModeChange(ViewMode.Hour)}>
        Hour
      </button>
      <button className={styles.Button} onClick={() => onViewModeChange(ViewMode.QuarterDay)}>
        Quarter of Day
      </button>
      <button className={styles.Button} onClick={() => onViewModeChange(ViewMode.HalfDay)}>
        Half of Day
      </button>
      <button className={styles.Button} onClick={() => onViewModeChange(ViewMode.Day)}>
        Day
      </button>
      <button className={styles.Button} onClick={() => onViewModeChange(ViewMode.Week)}>
        Week
      </button>
      <button className={styles.Button} onClick={() => onViewModeChange(ViewMode.Month)}>
        Month
      </button>

      <div className={styles.Switch}>
        <label className={styles.Switch_Toggle}>
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className={styles.Slider} />
        </label>
        Show Task List
      </div>
    </div>
  );
};

export default ViewSwitcher;
