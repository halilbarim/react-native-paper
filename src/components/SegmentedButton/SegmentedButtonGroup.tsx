import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import SegmentedButton from './SegmentedButton';

type Props = {
  /**
   * Function to execute on selection change.
   */
  onValueChange: (item: string | string[] | null) => void | null;
  /**
   * Value of the currently selected segmented button.
   */
  value: string | string[] | null;
  /**
   * React elements containing segmented buttons.
   */
  children: React.ReactNode;
  multiselect?: boolean;
  style?: StyleProp<ViewStyle>;
};

type SegmentedButtonContextType = {
  value: string | string[] | null;
  onValueChange: (item: string | string[] | null) => void | null;
};

export const SegmentedButtonGroupContext =
  React.createContext<SegmentedButtonContextType>(
    {} as SegmentedButtonContextType
  );

/**
 * Segmented button group allows to control a group of segmented buttons.</br>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { SegmentedButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = React.useState('left');
 *
 *   return (
 *     <SegmentedButton.Group
 *       onValueChange={value => setValue(value)}
 *       value={value}>
 *       <SegmentedButton icon="format-align-left" value="left" />
 *       <SegmentedButton icon="format-align-right" value="right" />
 *     </SegmentedButton.Group>
 *   );
 * };
 *
 * export default MyComponent;
 *```
 */
const SegmentedButtonGroup = ({
  value,
  onValueChange,
  multiselect,
  children,
  style,
}: Props) => {
  const count = React.Children.count(children);
  if (count < 2 || count > 5) {
    throw new Error(
      'Segmented buttons are best used for selecting between 2 and 5 choices. If you have more than five choices, consider using another component, such as chips.'
    );
  }

  return (
    <SegmentedButtonGroupContext.Provider
      value={{
        value,
        onValueChange,
      }}
    >
      <View style={[styles.row, style]}>
        {React.Children.map(children, (child, i) => {
          // @ts-expect-error: TypeScript complains about child.type but it doesn't matter
          if (child && child.type === SegmentedButton) {
            // @ts-expect-error: We're sure that child is a React Element
            return React.cloneElement(child, {
              segment: i === 0 ? 'first' : i === count - 1 ? 'last' : 'default',
              multiselect,
              style: [
                // @ts-expect-error: We're sure that child is a React Element
                child.props.style,
              ],
            });
          }

          return child;
        })}
      </View>
    </SegmentedButtonGroupContext.Provider>
  );
};

SegmentedButtonGroup.displayName = 'SegmentedButton.Group';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default SegmentedButtonGroup;

// @component-docs ignore-next-line
export { SegmentedButtonGroup };