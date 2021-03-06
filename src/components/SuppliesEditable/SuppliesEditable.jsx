import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import tinycolor from "tinycolor2";

import MaterialTable from "material-table";
import matTablelocalization from "../../utils/localizations";

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: theme.tables.borderSize,
        borderTopColor: theme.palette.primary.light,
        borderTopStyle: "solid",
    },
}));

const prepareData = (supply) => {
    supply.out = supply.out === "true" || supply.out === true ? true : false;
    return supply;
};

function SuppliesEditable({ isLoading, data, cartridges, apiController }) {
    const classes = useStyles();
    const theme = useTheme();

    const rowStyles = {
        outRow: {
            backgroundColor: tinycolor(theme.palette.error.light).lighten(20),
        },
        inRow: {
            backgroundColor: tinycolor(theme.palette.success.light).lighten(24),
        },
    };

    let cartridgesChoices = {};
    cartridges.forEach(
        (item) =>
            (cartridgesChoices[item.name] = `${item.manufacturer} ${item.name}`)
    );

    return (
        <MaterialTable
            isLoading={isLoading}
            components={{
                Container: (props) => (
                    <Paper
                        {...props}
                        elevation={theme.tables.elevation}
                        className={classes.root}
                    />
                ),
            }}
            localization={matTablelocalization}
            title="Перемещение Картриджей"
            columns={[
                {
                    title: "Дата",
                    field: "date",
                    type: "datetime",
                    editable: "never",
                },
                {
                    title: "Событие",
                    field: "out",
                    initialEditValue: "true",
                    lookup: { true: "Выдача", false: "Поступление" },
                },
                {
                    title: "Картридж",
                    field: "cartridge",
                    lookup: cartridgesChoices,
                },
                { title: "Количество", field: "count", type: "numeric" },
                { title: "Комментарий", field: "comment" },
            ]}
            data={data}
            options={{
                pageSize: 10,
                exportButton: true,
                actionsColumnIndex: -1,
                rowStyle: (rowData) =>
                    rowData.out ? rowStyles.outRow : rowStyles.inRow,
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        apiController.create(prepareData(newData));
                        resolve();
                    }),
                onRowUpdate: (newData) =>
                    new Promise((resolve) => {
                        apiController.update(prepareData(newData));
                        resolve();
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        apiController.delete(oldData);
                        resolve();
                    }),
            }}
        />
    );
}

export default SuppliesEditable;
