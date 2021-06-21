import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "teaset";
import { styles_calendar, styles_filter } from "./FilterPopoverView.style";
import { colors, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";
import { Button } from "../../../../../components";
import useFilterPopoverViewModel from "../../../ViewModels/Result/FilterPopoverViewModel";
import DateRangePicker from "../../../../../components/DateRangePicker.js";
import PickerItem from "../../../../../components/PickerItem";

const FilterPopoverView = props => {
  const {onApplyFilter, instance_type, major_id, start_date, end_date} = props;
  return {
    show: () => {
      const overlayId = Overlay.show(
        overlayView(
          {onApplyFilter, instance_type, major_id, start_date, end_date},
          () => overlayId,
        ),
      );
    },
  };
};

const overlayView = (
  {onApplyFilter, instance_type, major_id, start_date, end_date},
  getOverlayIdFunc,
) => {
  return (
    <Overlay.View
      style={styles_filter.backdrop}
      modal={false}
      overlayOpacity={0.5}>
      <ChildViewFilter
        instance_type={instance_type}
        major_id={major_id}
        onApplyFilter={({instance_type, major_id, start_date, end_date}) => {
          onApplyFilter({instance_type, major_id, start_date, end_date});
          const overlayId = getOverlayIdFunc();
          Overlay.hide(overlayId);
        }}
      />
    </Overlay.View>
  );
};

const ChildViewFilter = props => {
  const {onApplyFilter, instance_type, major_id, start_date, end_date} = props;

  const view = useFilterPopoverViewModel({
    instance_type,
    major_id,
    start_date,
    end_date,
  });

  const applyPressHandler = () => {
    const {instance_type, major_id, start_date, end_date} = view;
    view.show_calendar_first_loaded = false;
    view.updateView();
    onApplyFilter &&
      props.onApplyFilter({instance_type, major_id, start_date, end_date});
  };

  const removePressHandler = () => {
    const instance_type = '',
      major_id = '',
      start_date = '',
      end_date = '';
    view.setInstanceType(instance_type);
    view.setMajorId(major_id);
    view.start_date = start_date;
    view.end_date = end_date;
    view.show_calendar_first_loaded = false;
    view.updateView();
    onApplyFilter &&
      props.onApplyFilter({instance_type, major_id, start_date, end_date});
  };
  return (
    <View style={styles_filter.container}>
      {view.onWaiting() ? (
        <View style={styles_filter.emptyContainer}>
          <ActivityIndicator color={colors.THEFACULTY} />
        </View>
      ) : (
        <>
          <Text style={styles_filter.title}>
            {strings.TEST.RESULT_HOME.FILTER_TEXT}
          </Text>
          <PickerItem
            style={styles_filter.filterLabel}
            initialValue={instance_type}
            onChangeValue={value => {
              view.setInstanceType(value);
              view.updateView();
            }}
            label={strings.TEST.RESULT_HOME.FILTER_LABEL_TYPE}
            placeholder={strings.TEST.RESULT_HOME.FILTER_VALUE_TYPE}
            items={[
              {
                label: strings.TEST.RESULT_HOME.FILTER_TYPES.WAYBACK,
                value: 'wayback',
              },
              {
                label: strings.TEST.RESULT_HOME.FILTER_TYPES.CLONE,
                value: 'clone',
              },
            ]}
          />
          <PickerItem
            initialValue={major_id}
            onChangeValue={value => {
              view.setMajorId(value);
              view.updateView();
            }}
            label={strings.TEST.RESULT_HOME.FILTER_LABEL_MAJOR}
            placeholder={strings.TEST.RESULT_HOME.FILTER_VALUE_MAJOR}
            items={view.majors}
          />
          <View style={styles_filter.itemContainer}>
            <Text style={styles_filter.itemLabel}>
              {strings.TEST.RESULT_HOME.FILTER_LABEL_DATE}
            </Text>
            <TouchableOpacity
              onPress={() => {
                view.show_calendar = true;
                view.show_calendar_first_loaded = true;
                view.updateView();
              }}
              style={styles_filter.itemInputContainer}>
              <Text style={styles_filter.itemInputValue}>
                {view.start_date && view.end_date
                  ? `${view.start_date} ~ ${view.end_date}`
                  : strings.TEST.RESULT_HOME.FILTER_VALUE_DATE}
              </Text>
              <FastImage
                source={require('../../../../../../assets/images/icons/icn_arrow_down_blu.png')}
                style={styles_filter.arrowDownIcon}
              />
            </TouchableOpacity>
          </View>

          <Button style={styles_filter.applyButton} onPress={applyPressHandler}>
            {strings.TEST.RESULT_HOME.FILTER_BUTTON_APPLY}
          </Button>
          <Button
            style={styles_filter.removeButton}
            textStyle={styles_filter.removeButtonText}
            onPress={removePressHandler}>
            {strings.TEST.RESULT_HOME.FILTER_BUTTON_REMOVE}
          </Button>
        </>
      )}

      {view.show_calendar_first_loaded && (
        <CalendarItem
          show={view.show_calendar}
          onSelectRange={range => {
            const range_r = range.split(/\,/gi);
            view.setDateRange(range_r[0], range_r[1]);
            view.show_calendar = false;
            view.updateView();
          }}
          onCancel={() => {
            view.show_calendar = false;
            view.updateView();
          }}
        />
      )}
    </View>
  );
};

const CalendarItem = props => {
  const [range, setRange] = useState('');
  const {start_date, end_date, show} = props;
  const range_r = range.split(',');
  return (
    <View style={[styles_calendar.container, {left: show ? 0 : -1000}]}>
      <DateRangePicker
        initialRange={start_date && end_date ? [start_date, end_date] : null}
        onSuccess={(start_date, end_date) => {
          setRange(`${start_date},${end_date}`);
        }}
      />
      <Text style={styles_calendar.rangeText}>
        {range_r[0]}
        {range_r[0] && '   ~   '}
        {range_r[1]}
      </Text>
      <View style={styles_calendar.buttonContainer}>
        <TouchableOpacity
          style={[styles_calendar.button, styles_calendar.confirmButton]}
          onPress={() => {
            props.onSelectRange && props.onSelectRange(range);
          }}>
          <Text style={styles_calendar.confirmButtonText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles_calendar.button, styles_calendar.cancelButton]}
          onPress={() => {
            props.onCancel && props.onCancel();
          }}>
          <Text style={styles_calendar.cancelButtonText}>
            {strings.OTHER.CANCEL}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterPopoverView;
