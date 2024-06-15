<template>
    <div>
        <div id="app" ref="jexcel"></div><br />
    </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
export default {
    name: "SpreadSheet",
    data() {
        return {
            currentCell: "",
            colspan: 0,
            rowspan: 0,
            options: {
                data: this.exceldata,
                allowToolbar: false,
                wordWrap: true,
                minDimensions: [2, 2],
                columns: [],
                defaultColWidth: "100px",
                mergeCells: this.mergecell,
                editable: !this.readOnly,
                //方法移除了instance，origin参数，导致无法获取选中单元格的坐标信息，所以暂时注释掉onselection事件
                onselection: function (x1, y1, x2, y2) {
                    this.currentCell = jexcel.getColumnNameFromId([x1, y1]);
                    this.colspan = x2 - x1 + 1;
                    this.rowspan = y2 - y1 + 1;
                },
                //移除e	
                contextMenu: function (obj, x, y) {
                    var items = [];
                    if (x !== null && y !== null) {
                        if (obj.options.allowInsertRow == true && this.editable) {
                            items.push({
                                title: "在当前行前插入行",
                                onclick: function () {
                                    obj.insertRow(1, parseInt(y), 1);
                                },
                            });

                            items.push({
                                title: "在当前行后插入行",
                                onclick: function () {
                                    obj.insertRow(1, parseInt(y));
                                },
                            });
                        }

                        if (obj.options.allowDeleteRow == true && this.editable) {
                            items.push({
                                title: "删除选中行",
                                onclick: function () {
                                    obj.deleteRow(
                                        obj.getSelectedRows().length ? undefined : parseInt(y)
                                    );
                                },
                            });
                        }

                        if (obj.options.allowInsertColumn == true && this.editable) {
                            items.push({
                                title: "在此列前插入列",
                                onclick: function () {
                                    obj.insertColumn(1, parseInt(x), 1);
                                },
                            });
                        }

                        if (obj.options.allowInsertColumn == true && this.editable) {
                            items.push({
                                title: "在此列后插入列",
                                onclick: function () {
                                    obj.insertColumn(1, parseInt(x), 0);
                                },
                            });
                        }

                        // Delete a column
                        if (obj.options.allowDeleteColumn == true && this.editable) {
                            items.push({
                                title: "删除选中列",
                                onclick: function () {
                                    obj.deleteColumn(
                                        obj.getSelectedColumns().length ?
                                            undefined :
                                            parseInt(x)
                                    );
                                },
                            });
                        }
                    }

                    if (this.editable) {
                        items.push({
                            title: "合并单元格",
                            onclick: function () {
                                obj.setMerge(obj.currentCell, obj.colspan, obj.rowspan);
                            },
                        })
                        items.push({
                            title: "拆分单元格",
                            onclick: function () {
                                obj.removeMerge(obj.currentCell)
                            },
                        })
                    }
                    return items;
                }
            }
        }
    },
    props: ["exceldata", "mergecell", "readOnly"],
    mounted() {
        let spreadsheet = jexcel(this.$refs.jexcel, this.options);
        Object.assign(this, spreadsheet);
        // spreadsheet.refresh();			
    }
}
</script>

<style scoped></style>
