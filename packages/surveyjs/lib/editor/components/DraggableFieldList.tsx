/**
 * DraggableFieldList component using react-grid-layout for single-column reordering
 */

import React from "react";
import {
  Responsive,
  Layout,
  useContainerWidth,
  LayoutItem,
} from "react-grid-layout";
import { FieldItem } from "./FieldItem";
import "react-grid-layout/css/styles.css";
import "./DraggableFieldList.css";
import { FormField } from "@workspace/models/dynamic-form";
interface DraggableFieldListProps {
  fields: FormField[];
  selectedFieldIndex: number | null;
  onSelectField: (index: number) => void;
  onRemoveField: (index: number) => void;
  onUpdateField: (index: number, updates: Partial<FormField>) => void;
  onReorderFields: (newFields: FormField[]) => void;
}

export const DraggableFieldList: React.FC<DraggableFieldListProps> = ({
  fields,
  selectedFieldIndex,
  onSelectField,
  onRemoveField,
  onUpdateField,
  onReorderFields,
}) => {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: false,
    initialWidth: 1200,
  });

  // Generate layout configuration for single column with dynamic heights
  const generateLayout = (): LayoutItem[] => {
    let currentY = 0;

    return fields.map((field, index) => {
      // Calculate height based on field type and content - balanced for no overlap
      let height = 2.8; // Base height - increased to prevent overlap

      // Adjust height based on field type
      if (field.type === "textarea") {
        height = 3.5; // More space for textarea fields
      }

      // Add extra height if field has description
      if (field.description && field.description.length > 0) {
        height += 0.8; // More space for descriptions
      }

      // Add extra height for longer labels
      if (field.label && field.label.length > 30) {
        height += 0.5; // Space for long labels
      }

      const layoutItem: LayoutItem = {
        i: field.id, // Use field ID instead of index for stable keys
        x: 0, // Single column, so x is always 0
        y: currentY, // Proper vertical position to prevent overlap
        w: 1, // Full width in single column
        h: height, // Dynamic height based on content
        minW: 1,
        maxW: 1,
        minH: 2.5,
        maxH: 5, // Allow up to 5 units height
      };

      currentY += height; // Increment Y position for next item
      return layoutItem;
    });
  };

  const handleDragStop = (
    newLayout: Layout,
    oldItem: LayoutItem | null,
    newItem: LayoutItem | null,
    placeholder: LayoutItem | null,
    event: Event,
    element?: HTMLElement,
  ) => {
    // Sort layout by y position to get new order
    const sortedLayout = [...newLayout].sort((a, b) => a.y - b.y);

    // Create new fields array based on the sorted layout
    const newFields = sortedLayout
      .map((layoutItem) => {
        return fields.find((f) => f.id === layoutItem.i);
      })
      .filter(Boolean) as FormField[]; // Remove any undefined items

    // Check if order actually changed
    const orderChanged = newFields.some(
      (field, index) => fields[index]?.id !== field.id,
    );

    // Only update if the order actually changed
    if (orderChanged && newFields.length === fields.length) {
      onReorderFields(newFields);
    }
  };

  return (
    <div className="draggable-field-list" ref={containerRef}>
      {mounted && (
        <Responsive
          className="layout"
          layouts={{ lg: generateLayout() }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 }}
          width={width}
          autoSize={true}
          rowHeight={65}
          onDragStop={handleDragStop}
          margin={[0, 8]}
          containerPadding={[0, 0]}
          dragConfig={{
            cancel: ".no-drag",
          }}
        >
          {fields.map((field, index) => (
            <div key={field.id} className="grid-item">
              <FieldItem
                field={field}
                index={index}
                isSelected={selectedFieldIndex === index}
                onSelect={() => onSelectField(index)}
                onRemove={() => onRemoveField(index)}
                onUpdate={(updates) => onUpdateField(index, updates)}
              />
            </div>
          ))}
        </Responsive>
      )}
    </div>
  );
};
