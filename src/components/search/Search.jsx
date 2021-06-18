import React, {useState, useEffect, useRef, Fragment} from "react";

import {withStyles} from "@material-ui/styles";
import SearchStyle, {customStyles} from "./SearchStyle";
import Select from "react-select";
import {ClickAwayListener, useTheme, ListItem, Divider} from "@material-ui/core";
import Error from "../error/Error";
import Input from "../input/Input";

import InputDate from "../input/InputDate";
import InputDateDouble from "../input/InputDateDouble";
import {wait} from "../../core/utils/misc";
import Menu from "../menu/CustomMenu";
import CustomSelect from "../select/Select";
import AssignUser from "../assignUser/AssignUser";
import Avatar from "../avatar/Avatar";
import {useTranslation} from "react-i18next";
import Icon from "../icon/Icon";
import AddFilter from "./components/AddFilter";
import RecentSearch from "./components/RecentSearch";
import CreatableSelect from "react-select/creatable";
import AssignTicket from "../assignTicket/AssignTicket";
import AssignEntity from "../assignEntity/AssignEntity";
import AssignModule from "../assignModule/AssignModule";
import AssignFramework from "../assignFramework/AssignFramework";
import AssignTaxonomy from "../assignTaxonomy/AssignTaxonomy";
import AssignSupervisor from "../assignSupervisor/AssignSupervisor";
import AssignCurrency from "../assignCurrency/AssignCurrency";
import AssignStatus from "../assignStatus/AssignStatus";
import AssignFrequency from "../assignFrequency/AssignFrequency";
import AssignSourceSystem from "../assignSourceSystem/AssignSourceSystem";
import {ONE_DAY} from "../../core/constants";
import moment from "moment";

const Search = ({
    classes,
    isLoading,
    filters,
    setFiltersValue,
    noSaved,
    defaultLabel,
    defaultKey,
    noMultiValues,
    defaultSelect = [],
}) => {
    const [selected, setSelected] = useState(defaultSelect);
    const [assignees, setAssignees] = useState([]);
    const [assignTicket, setAssignTickets] = useState([]);
    const [assignModules, setAssignModules] = useState([]);
    const [assignEntitys, setAssignEntitys] = useState([]);
    const [assignTaxonomy, setAssignTaxonomy] = useState([]);
    const [assignFrameworks, setAssignFrameworks] = useState([]);
    const [assignSupervisor, setAssignSupervisor] = useState([]);
    const [assignCurrency, setAssignCurrency] = useState([]);
    const [assignStatus, setAssignStatus] = useState([]);
    const [assignFrequency, setAssignFrequency] = useState([]);
    const [assignSourceSystem, setAssignSourceSystem] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editionMode, setEditionMode] = useState(null);
    const [inputType, setInputType] = useState("SELECT");
    const [currentOption, setCurrentOption] = useState(filters);
    const [filter, setFilter] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSaveFilter, setOpenSaveFilter] = useState(false);
    const [createOptionValue, setCreateField] = useState("");
    const selectRef = useRef();
    const theme = useTheme();
    const {t} = useTranslation();

    useEffect(
        () => async () => {
            await wait(100);
            const select_user = document.querySelector("#select_user_menu");

            if (select_user) {
                setAnchorEl(select_user);
                select_user.click();
            }

            const select_ticket = document.querySelector("#select_ticket_menu");

            if (select_ticket) {
                setAnchorEl(select_ticket);
                select_ticket.click();
            }

            const select_module = document.querySelector("#select_module_menu");

            if (select_module) {
                setAnchorEl(select_module);
                select_module.click();
            }

            const select_entity = document.querySelector("#select_entity_menu");

            if (select_entity) {
                setAnchorEl(select_entity);
                select_entity.click();
            }

            const select_framework = document.querySelector("#select_framework_menu");

            if (select_framework) {
                setAnchorEl(select_framework);
                select_framework.click();
            }

            const select_taxonomy = document.querySelector("#select_taxonomy_menu");

            if (select_taxonomy) {
                setAnchorEl(select_taxonomy);
                select_taxonomy.click();
            }

            const select_supervisor = document.querySelector("#select_supervisor_menu");

            if (select_supervisor) {
                setAnchorEl(select_supervisor);
                select_supervisor.click();
            }

            const select_currency = document.querySelector("#select_currency_menu");

            if (select_currency) {
                setAnchorEl(select_currency);
                select_currency.click();
            }

            const select_status = document.querySelector("#select_status_menu");

            if (select_status) {
                setAnchorEl(select_status);
                select_status.click();
            }
            const select_frequency = document.querySelector("#select_frequency_menu");

            if (select_frequency) {
                setAnchorEl(select_frequency);
                select_frequency.click();
            }
            const select_source_system = document.querySelector("#select_source_system_menu");

            if (select_source_system) {
                setAnchorEl(select_source_system);
                select_source_system.click();
            }
        },
        [inputType],
    );

    useEffect(() => {
        let query = [];

        for (let filtrate of selected) {
            let values = null;

            if (Array.isArray(filtrate.filter[2].value)) {
                values = filtrate.filter[2].value.map((val) => val.toString());
            } else {
                values = filtrate.filter[2].value.toString();
            }

            if (filtrate.filter[0].type === "DATE" && values.length === 2) {
                values = [values[0], moment(new Date(values[1])).add(1, "days").format("YYYY-MM-DD")];
            }
            query.push({
                inner_stack_operator: "and",
                key: filtrate.filter[0].value,
                filters: [
                    {
                        operator: filtrate.filter[1].value,
                        values,
                    },
                ],
            });
        }

        setFiltersValue(query);
        scrollController();
    }, [selected, setFiltersValue]);

    const selectTypeFirstLevel = (newValue) => {
        switch (newValue.formType) {
            case "STRING": {
                setFilter([newValue, {value: "iLike", label: "iLike"}]);
                setInputType(newValue.formType);
                break;
            }
            default: {
                setFilter([newValue]);
                let menu = [];

                for (let operators of newValue.valid_operators) {
                    menu.push({
                        value: operators,
                        label: t(`filter.type.${operators}`),
                        formType: newValue.formType,
                    });
                }
                setCurrentOption(menu);
            }
        }
    };

    const selectTypeSecondLevel = (newValue) => {
        switch (newValue.formType) {
            case "DATE": {
                setFilter((e) => [...e, newValue]);
                if (newValue.value === "between" || newValue.value === "notBetween") {
                    setInputType("DATE_DOUBLE");
                } else if (newValue.value === "gte" || newValue.value === "lte") {
                    setInputType("DATE");
                } else {
                    setIsMenuOpen(false);
                    setCurrentOption(filters);
                }
                break;
            }
            case "NUMBER": {
                setFilter((e) => [...e, newValue]);
                setInputType("NUMBER");
                break;
            }
            case "ID": {
                setFilter((e) => [...e, newValue]);
                setInputType("STRING");
                break;
            }
            case "USER": {
                setFilter((e) => [...e, newValue]);
                setInputType("USER");
                break;
            }
            case "TICKET": {
                setFilter((e) => [...e, newValue]);
                setInputType("TICKET");
                break;
            }
            case "MODULE": {
                setFilter((e) => [...e, newValue]);
                setInputType("MODULE");
                break;
            }
            case "ENTITY": {
                setFilter((e) => [...e, newValue]);
                setInputType("ENTITY");
                break;
            }
            case "FRAMEWORK": {
                setFilter((e) => [...e, newValue]);
                setInputType("FRAMEWORK");
                break;
            }
            case "TAXONOMY": {
                setFilter((e) => [...e, newValue]);
                setInputType("TAXONOMY");
                break;
            }
            case "SUPERVISOR": {
                setFilter((e) => [...e, newValue]);
                setInputType("SUPERVISOR");
                break;
            }
            case "CURRENCY": {
                setFilter((e) => [...e, newValue]);
                setInputType("CURRENCY");
                break;
            }
            case "STATUS": {
                setFilter((e) => [...e, newValue]);
                setInputType("STATUS");
                break;
            }
            case "FREQUENCY": {
                setFilter((e) => [...e, newValue]);
                setInputType("FREQUENCY");
                break;
            }
            case "SOURCE_SYSTEM": {
                setFilter((e) => [...e, newValue]);
                setInputType("SOURCE_SYSTEM");
                break;
            }
            default: {
                setFilter((e) => [...e, newValue]);
                setCurrentOption(filter);
            }
        }
    };

    const selectTypeThirdLevel = async (newValue) => {
        let newSelected = [];
        const filterEnd = [...filter, newValue];

        newSelected = [
            ...selected,
            {
                value: new Date().getTime(),
                label: `${filterEnd[0].label} ${filterEnd[1].label} ${filterEnd[2].label}`,
                filter: [...filter, newValue],
            },
        ];
        setSelected(newSelected);
        setCurrentOption(filters);
        setFilter([]);
        setInputType("SELECT");
        // await wait(200);
        // selectRef.current.focus();
        setIsMenuOpen(false);
    };

    const selectStep = (newValue) => {
        switch (filter.length) {
            case 0: {
                selectTypeFirstLevel(newValue);
                break;
            }
            case 1: {
                selectTypeSecondLevel(newValue);
                break;
            }
            case 2: {
                selectTypeThirdLevel(newValue);
                break;
            }
            default:
                setIsMenuOpen(false);
                setCurrentOption(filters);
        }
    };

    const deleteItem = (item) => {
        setSelected((e) => e.filter((i) => i.value !== item.value));
    };

    const createOption = async () => {
        const newSelected = [
            ...selected,
            {
                value: new Date().getTime(),
                label: `${defaultLabel} iLike ${createOptionValue}`,
                filter: [
                    {
                        label: defaultLabel,
                        key: defaultKey,
                        valid_operators: ["iLike"],
                        formType: "STRING",
                        value: defaultKey,
                        raw: defaultKey,
                    },
                    {value: "iLike", label: "iLike"},
                    {
                        value: createOptionValue,
                        label: createOptionValue,
                        raw: createOptionValue,
                        formType: "STRING",
                    },
                ],
            },
        ];

        setSelected(newSelected);
        setCurrentOption(filters);
        setFilter([]);
        setInputType("SELECT");
    };

    const handleChange = (newValue, actionMeta) => {
        switch (actionMeta.action) {
            case "select-option":
                selectStep({
                    ...actionMeta.option,
                    raw: actionMeta.option.value,
                });
                break;
            case "create-string":
                selectStep({
                    value: newValue,
                    label: newValue,
                    raw: newValue,
                    type: "STRING",
                });
                break;
            case "create-number":
                selectStep({
                    value: newValue,
                    label: newValue,
                    raw: newValue,
                    type: "NUMBER",
                });
                break;
            case "create-option":
                createOption();
                break;
            case "create-date":
                selectStep({
                    value: newValue,
                    label: newValue,
                    raw: newValue,
                    formType: "DATE",
                });
                break;
            case "create-date-double":
                selectStep({
                    value: [newValue.from, newValue.to],
                    label: `${newValue.from} - ${newValue.to}`,
                    raw: {
                        from: new Date(newValue.from),
                        to: new Date(newValue.to),
                    },
                    formType: "DATE_DOUBLE",
                });
                break;
            case "create-user":
                selectStep({
                    value: newValue.map((user) => user.id),
                    raw: newValue,
                    label: "",
                    user: newValue,
                    formType: "USER",
                });
                break;
            case "create-ticket":
                selectStep({
                    value: newValue.map((ticket) => ticket.id),
                    raw: newValue,
                    label: "",
                    ticket: newValue,
                    formType: "TICKET",
                });
                break;
            case "create-module":
                selectStep({
                    value: newValue.map((mod) => mod.code),
                    raw: newValue,
                    label: "",
                    module: newValue,
                    formType: "MODULE",
                });
                break;
            case "create-entity":
                selectStep({
                    value: newValue.map((entity) => entity.EntityId),
                    raw: newValue,
                    label: "",
                    entity: newValue,
                    formType: "ENTITY",
                });
                break;
            case "create-framework":
                selectStep({
                    value: newValue.map((framework) => framework.code),
                    raw: newValue,
                    label: "",
                    framework: newValue,
                    formType: "FRAMEWORK",
                });
                break;
            case "create-taxonomy":
                selectStep({
                    value: newValue.map((taxonomy) => taxonomy.code),
                    raw: newValue,
                    label: "",
                    taxonomy: newValue,
                    formType: "TAXONOMY",
                });
                break;
            case "create-supervisor":
                selectStep({
                    value: newValue.map((sup) => sup.code),
                    raw: newValue,
                    label: "",
                    supervisor: newValue,
                    formType: "SUPERVISOR",
                });
                break;
            case "create-currency":
                selectStep({
                    value: newValue.map((cur) => cur.type),
                    raw: newValue,
                    label: "",
                    currency: newValue,
                    formType: "CURRENCY",
                });
                break;
            case "create-status":
                selectStep({
                    value: newValue.map((status) => status.title),
                    raw: newValue,
                    label: "",
                    status: newValue,
                    formType: "STATUS",
                });
                break;
            case "create-frequency":
                selectStep({
                    value: newValue.map((frequency) => frequency.code),
                    raw: newValue,
                    label: "",
                    frequency: newValue,
                    formType: "FREQUENCY",
                });
                break;
            case "create-source-system":
                selectStep({
                    value: newValue.map((sourceSystem) => sourceSystem.id),
                    raw: newValue,
                    label: "",
                    sourceSystem: newValue,
                    formType: "SOURCE_SYSTEM",
                });
                break;
            case "menu-close":
                closeMenu();
                break;
            case "remove-value":
                deleteItem(actionMeta.removedValue);
                break;
            case "clear":
                closeMenu();
                setSelected([]);
                break;
            default:
                break;
        }
    };

    const submit = (data, formType) => {
        if (!editionMode) {
            switch (formType) {
                case "STRING":
                    data.preventDefault();

                    handleChange(data.target.string.value, {
                        action: "create-string",
                    });
                    break;
                case "NUMBER":
                    data.preventDefault();

                    handleChange(data.target.number.value, {
                        action: "create-number",
                    });
                    break;
                case "DATE":
                    handleChange(data, {action: "create-date"});
                    break;
                case "SELECT":
                    handleChange(null, data);
                    break;
                case "DATE_DOUBLE":
                    handleChange(data, {action: "create-date-double"});
                    break;
                case "USER":
                    setAnchorEl(null);
                    if (assignees && assignees.length > 0) {
                        setAssignees([]);
                        handleChange(assignees, {action: "create-user"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "TICKET":
                    setAnchorEl(null);
                    if (assignTicket && assignTicket.length > 0) {
                        setAssignTickets([]);
                        handleChange(assignTicket, {action: "create-ticket"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "MODULE":
                    setAnchorEl(null);
                    if (assignModules && assignModules.length > 0) {
                        setAssignModules([]);
                        handleChange(assignModules, {action: "create-module"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "ENTITY":
                    setAnchorEl(null);
                    if (assignEntitys && assignEntitys.length > 0) {
                        setAssignEntitys([]);
                        handleChange(assignEntitys, {action: "create-entity"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "FRAMEWORK":
                    setAnchorEl(null);
                    if (assignFrameworks && assignFrameworks.length > 0) {
                        setAssignFrameworks([]);
                        handleChange(assignFrameworks, {action: "create-framework"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "TAXONOMY":
                    setAnchorEl(null);
                    if (assignTaxonomy && assignTaxonomy.length > 0) {
                        setAssignTaxonomy([]);
                        handleChange(assignTaxonomy, {action: "create-taxonomy"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "SUPERVISOR":
                    setAnchorEl(null);
                    if (assignSupervisor && assignSupervisor.length > 0) {
                        setAssignSupervisor([]);
                        handleChange(assignSupervisor, {action: "create-supervisor"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "CURRENCY":
                    setAnchorEl(null);
                    if (assignCurrency && assignCurrency.length > 0) {
                        setAssignCurrency([]);
                        handleChange(assignCurrency, {action: "create-currency"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "STATUS":
                    setAnchorEl(null);
                    if (assignStatus && assignStatus.length > 0) {
                        setAssignStatus([]);
                        handleChange(assignStatus, {action: "create-status"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "FREQUENCY":
                    setAnchorEl(null);
                    if (assignFrequency && assignFrequency.length > 0) {
                        setAssignFrequency([]);
                        handleChange(assignFrequency, {action: "create-frequency"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "SOURCE_SYSTEM":
                    setAnchorEl(null);
                    if (assignSourceSystem && assignSourceSystem.length > 0) {
                        setAssignSourceSystem([]);
                        handleChange(assignSourceSystem, {action: "create-source-system"});
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                default:
                    break;
            }
        } else {
            const valueIndex = selected.findIndex((option) => option.value === editionMode.id);

            let newFilter = {};

            switch (formType) {
                case "STRING":
                    data.preventDefault();
                    newFilter = {
                        value: data.target.string.value,
                        label: data.target.string.value,
                        raw: data.target.string.value,
                        formType: "STRING",
                    };
                    break;
                case "NUMBER":
                    data.preventDefault();
                    newFilter = {
                        value: data.target.number.value,
                        label: data.target.number.value,
                        raw: data.target.number.value,
                        formType: "NUMBER",
                    };
                    break;
                case "DATE":
                    newFilter = {
                        value: data,
                        label: data,
                        raw: new Date(data),
                        formType: "DATE",
                    };
                    break;
                case "DATE_DOUBLE":
                    newFilter = {
                        value: [data.from, data.to],
                        label: `${data.from} - ${data.to}`,
                        raw: {from: new Date(data.from), to: new Date(new Date(data.to).getTime() + ONE_DAY)},
                        formType: "DATE_DOUBLE",
                    };
                    break;
                case "SELECT":
                    newFilter = data;
                    break;
                case "USER":
                    setAnchorEl(null);
                    if (assignees && assignees.length > 0) {
                        setAssignees([]);
                        newFilter = {
                            value: assignees.map((user) => user.id),
                            label: "",
                            user: assignees,
                            raw: assignees,
                            formType: "USER",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "TICKET":
                    setAnchorEl(null);
                    if (assignTicket && assignTicket.length > 0) {
                        setAssignTickets([]);
                        newFilter = {
                            value: assignTicket.map((ticket) => ticket.id),
                            label: "",
                            ticket: assignTicket,
                            raw: assignTicket,
                            formType: "TICKET",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "MODULE":
                    setAnchorEl(null);
                    if (assignModules && assignModules.length > 0) {
                        setAssignModules([]);
                        newFilter = {
                            value: assignModules.map((mod) => mod.code),
                            label: "",
                            module: assignModules,
                            raw: assignModules,
                            formType: "MODULE",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "ENTITY":
                    setAnchorEl(null);
                    if (assignEntitys && assignEntitys.length > 0) {
                        setAssignEntitys([]);
                        newFilter = {
                            value: assignEntitys.map((entity) => entity.EntityId),
                            label: "",
                            entity: assignEntitys,
                            raw: assignEntitys,
                            formType: "ENTITY",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "FRAMEWORK":
                    setAnchorEl(null);
                    if (assignFrameworks && assignFrameworks.length > 0) {
                        setAssignFrameworks([]);
                        newFilter = {
                            value: assignFrameworks.map((fra) => fra.code),
                            label: "",
                            framework: assignFrameworks,
                            raw: assignFrameworks,
                            formType: "FRAMEWORK",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "TAXONOMY":
                    setAnchorEl(null);
                    if (assignTaxonomy && assignTaxonomy.length > 0) {
                        setAssignTaxonomy([]);
                        newFilter = {
                            value: assignTaxonomy.map((tax) => tax.code),
                            label: "",
                            framework: assignTaxonomy,
                            raw: assignTaxonomy,
                            formType: "TAXONOMY",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "SUPERVISOR":
                    setAnchorEl(null);
                    if (assignSupervisor && assignSupervisor.length > 0) {
                        setAssignSupervisor([]);
                        newFilter = {
                            value: assignSupervisor.map((sup) => sup.code),
                            label: "",
                            supervisor: assignSupervisor,
                            raw: assignSupervisor,
                            formType: "SUPERVISOR",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "CURRENCY":
                    setAnchorEl(null);
                    if (assignCurrency && assignCurrency.length > 0) {
                        setAssignCurrency([]);
                        newFilter = {
                            value: assignCurrency.map((cur) => cur.type),
                            label: "",
                            currency: assignCurrency,
                            raw: assignCurrency,
                            formType: "CURRENCY",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "STATUS":
                    setAnchorEl(null);
                    if (assignStatus && assignStatus.length > 0) {
                        setAssignStatus([]);
                        newFilter = {
                            value: assignStatus.map((status) => status.title),
                            label: "",
                            status: assignStatus,
                            raw: assignStatus,
                            formType: "STATUS",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "FREQUENCY":
                    setAnchorEl(null);
                    if (assignFrequency && assignFrequency.length > 0) {
                        setAssignFrequency([]);
                        newFilter = {
                            value: assignFrequency.map((frequency) => frequency.code),
                            label: "",
                            frequency: assignFrequency,
                            raw: assignFrequency,
                            formType: "FREQUENCY",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                case "SOURCE_SYSTEM":
                    setAnchorEl(null);
                    if (assignSourceSystem && assignSourceSystem.length > 0) {
                        setAssignSourceSystem([]);
                        newFilter = {
                            value: assignSourceSystem.map((sourceSystem) => sourceSystem.id),
                            label: "",
                            sourceSystem: assignSourceSystem,
                            raw: assignSourceSystem,
                            formType: "SOURCE_SYSTEM",
                        };
                    } else {
                        setInputType("SELECT");
                        setIsMenuOpen(false);
                        setCurrentOption(filters);
                        setFilter([]);
                    }
                    break;
                default:
                    setInputType("SELECT");
                    setIsMenuOpen(false);
                    setCurrentOption(filters);
                    setFilter([]);
                    break;
            }

            const newValue = {
                ...selected[valueIndex],
                filter: [selected[valueIndex].filter[0], selected[valueIndex].filter[1], newFilter],
            };

            setSelected([
                ...selected.slice(0, valueIndex),
                newValue,
                ...selected.slice(valueIndex + 1, selected.length),
            ]);
            setCurrentOption(filters);
            setFilter([]);
            setInputType("SELECT");
            setEditionMode(null);
        }
    };

    const closeMenu = () => {
        if (
            inputType !== "ID" &&
            inputType !== "DATE" &&
            inputType !== "DATE_DOUBLE" &&
            inputType !== "USER" &&
            inputType !== "TICKET" &&
            inputType !== "ENTITY" &&
            inputType !== "FRAMEWORK" &&
            inputType !== "TAXONOMY" &&
            inputType !== "SUPERVISOR" &&
            inputType !== "CURRENCY" &&
            inputType !== "STATUS" &&
            inputType !== "FREQUENCY" &&
            inputType !== "SOURCE_SYSTEM" &&
            inputType !== "MODULE"
        ) {
            setIsMenuOpen(false);
            setEditionMode(null);
            setInputType("SELECT");
            setCurrentOption(filters);
            setFilter([]);
        }
    };

    const closeMenuForce = () => {
        setIsMenuOpen(false);
        setEditionMode(null);
        setInputType("SELECT");
        setCurrentOption(filters);
        setFilter([]);
    };

    const editData = (data) => {
        const editionFilter = data.filter[2];

        setEditionMode({id: data.value, raw: editionFilter.raw});
        if (editionFilter.formType === "USER") {
            setAssignees(editionFilter.raw);
        } else if (editionFilter.formType === "TICKET") {
            setAssignTickets(editionFilter.raw);
        } else if (editionFilter.formType === "MODULE") {
            setAssignModules(editionFilter.raw);
        } else if (editionFilter.formType === "ENTITY") {
            setAssignEntitys(editionFilter.raw);
        } else if (editionFilter.formType === "FRAMEWORK") {
            setAssignFrameworks(editionFilter.raw);
        } else if (editionFilter.formType === "TAXONOMY") {
            setAssignTaxonomy(editionFilter.raw);
        } else if (editionFilter.formType === "SUPERVISOR") {
            setAssignSupervisor(editionFilter.raw);
        } else if (editionFilter.formType === "CURRENCY") {
            setAssignCurrency(editionFilter.raw);
        } else if (editionFilter.formType === "STATUS") {
            setAssignStatus(editionFilter.raw);
        } else if (editionFilter.formType === "FREQUENCY") {
            setAssignFrequency(editionFilter.raw);
        } else if (editionFilter.formType === "SOURCE_SYSTEM") {
            setAssignSourceSystem(editionFilter.raw);
        }
        setInputType(editionFilter.type ?? editionFilter.formType);
    };

    const MultiValueContainer = (props) => {
        const {children, data, innerRef, innerProps} = props;
        const label = `
            ${t(`${data.filter[0].label}`)} 
            ${t(`filter.type.${data.filter[1].value}`)} 
            ${t(`${data.filter[2].label}`)} 
        `;

        const render = () => {
            if (data && data.filter && data.filter[2]) {
                if (data.filter[2].user) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.avatarsContainer}>
                                    {data.filter[2].user.map((user, index) => (
                                        <Avatar key={`avatar/${index}`} user={user} size="smaller" negMargin noMargin />
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].ticket) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].ticket.map((ticket, index) => (
                                        <span key={`ticket/${index}`}>
                                            #{ticket.id} {data.filter[2].ticket.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].module) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].module.map((mod, index) => (
                                        <span key={`mod/${index}`}>
                                            #{mod.id} {data.filter[2].module.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].entity) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].entity.map((entity, index) => (
                                        <span key={`entity/${index}`}>
                                            {entity.Entity} {data.filter[2].entity.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].framework) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].framework.map((framework, index) => (
                                        <span key={`framework/${index}`}>
                                            {framework.code} {data.filter[2].framework.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].taxonomy) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].taxonomy.map((taxonomy, index) => (
                                        <span key={`taxonomy/${index}`}>
                                            {taxonomy.code} {data.filter[2].taxonomy.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].supervisor) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].supervisor.map((supervisor, index) => (
                                        <span key={`supervisor/${index}`}>
                                            {supervisor.code}{" "}
                                            {data.filter[2].supervisor.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].currency) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].currency.map((currency, index) => (
                                        <span key={`currency/${index}`}>
                                            {currency.type} {data.filter[2].currency.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].status) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].status.map((status, index) => (
                                        <span key={`status/${index}`}>
                                            {status.title} {data.filter[2].status.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].frequency) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].frequency.map((frequency, index) => (
                                        <span key={`frequency/${index}`}>
                                            {frequency.code} {data.filter[2].frequency.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                } else if (data.filter[2].sourceSystem) {
                    return (
                        <div className={classes.tag}>
                            <div onClick={() => editData(data)} className={classes.avatars}>
                                {children[0]}
                                <div className={classes.tagText}>
                                    {data.filter[2].sourceSystem.map((sourceSystem, index) => (
                                        <span key={`sourceSystem/${index}`}>
                                            {sourceSystem.title}{" "}
                                            {data.filter[2].sourceSystem.length - 1 > index ? "| " : " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {children[1]}
                        </div>
                    );
                }
            }
            return (
                <div className={classes.tag}>
                    <span className={classes.tagText} onClick={() => editData(data)}>
                        {label}
                    </span>
                    {children[1]}
                </div>
            );
        };

        return (
            <div ref={innerRef} {...innerProps}>
                {render()}
            </div>
        );
    };

    const deleteValue = (index) => {
        setSelected((select) => [...select.slice(0, index), ...select.slice(index + 1, select.length)]);
    };

    const renderValue = (data, index) => {
        const label = `
            ${t(`${data.filter[0].label}`)} 
            ${t(`filter.type.${data.filter[1].value}`)}
            ${t(`${data.filter[2].label}`)} 
            
        `;

        if (data && data.filter && data.filter[2]) {
            if (data.filter[2].user) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.avatarsContainer}>
                                {data.filter[2].user.map((user, i) => (
                                    <Avatar key={`avatar/${i}`} user={user} size="smaller" negMargin noMargin />
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].ticket) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].ticket.map((ticket, j) => (
                                    <div className={classes.customFilterTest} key={`ticket/${j}`}>
                                        #{ticket.id}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].module) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].module.map((mod, j) => (
                                    <div className={classes.customFilterTest} key={`module/${j}`}>
                                        #{mod.id}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].entity) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].entity.map((entity, j) => (
                                    <div className={classes.customFilterTest} key={`entity/${j}`}>
                                        {entity.Entity}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].framework) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].framework.map((framework, j) => (
                                    <div className={classes.customFilterTest} key={`framework/${j}`}>
                                        {framework.code}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].taxonomy) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].taxonomy.map((taxonomy, j) => (
                                    <div className={classes.customFilterTest} key={`taxonomy/${j}`}>
                                        {taxonomy.code}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].supervisor) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].supervisor.map((supervisor, j) => (
                                    <div className={classes.customFilterTest} key={`supervisor/${j}`}>
                                        {supervisor.code}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].currency) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].currency.map((currency, j) => (
                                    <div className={classes.customFilterTest} key={`currency/${j}`}>
                                        {currency.type}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].status) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].status.map((status, j) => (
                                    <div className={classes.customFilterTest} key={`status/${j}`}>
                                        {status.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].frequency) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].frequency.map((frequency, j) => (
                                    <div className={classes.customFilterTest} key={`frequency/${j}`}>
                                        {frequency.code}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            } else if (data.filter[2].sourceSystem) {
                return (
                    <ListItem role="listitem" button className={classes.tag}>
                        <div onClick={() => editData(data)} className={classes.customFilterTest}>
                            {t(`${data.filter[0].label}`)} {t(`filter.type.${data.filter[1].value}`)}
                            <div className={classes.noMultiValuesOperator}>
                                {data.filter[2].sourceSystem.map((sourceSystem, j) => (
                                    <div className={classes.customFilterTest} key={`sourceSystem/${j}`}>
                                        {sourceSystem.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Icon onClick={() => deleteValue(index)} size={14}>
                            Delete
                        </Icon>
                    </ListItem>
                );
            }
        }
        return (
            <ListItem role="listitem" button className={classes.tag}>
                <div className={classes.customFilterTest} onClick={() => editData(data)}>
                    {label}
                </div>
                <Icon onClick={() => deleteValue(index)} size={14}>
                    Delete
                </Icon>
            </ListItem>
        );
    };

    const renderTypeInput = (formType) => {
        switch (formType) {
            case "STRING":
                return (
                    <form onSubmit={(e) => submit(e, "STRING")} className={classes.input}>
                        <Input
                            name="string"
                            placeholder={t("filter.search.string")}
                            autoFocus
                            defaultValue={editionMode && editionMode.raw}
                        />
                    </form>
                );
            case "NUMBER":
                return (
                    <form onSubmit={(e) => submit(e, "NUMBER")} className={classes.input}>
                        <Input
                            name="number"
                            placeholder={t("filter.search.NUMBER")}
                            autoFocus
                            defaultValue={editionMode && editionMode.raw}
                        />
                    </form>
                );
            case "DATE_DOUBLE":
                return (
                    <div className={classes.input}>
                        <InputDateDouble
                            name="string"
                            placeholder={t("filter.search.dateDouble")}
                            autoFocus
                            onChange={(e) => submit(e, "DATE_DOUBLE")}
                            format="YYYY-MM-DD"
                            onClose={() => closeMenuForce()}
                            range={editionMode && editionMode.raw}
                        />
                    </div>
                );
            case "DATE":
                return (
                    <div className={classes.input}>
                        <InputDate
                            name="string"
                            placeholder={t("filter.search.date")}
                            autoFocus
                            onChange={(e) => submit(e, "DATE")}
                            format="YYYY-MM-DD"
                            onClose={() => closeMenuForce()}
                            value={editionMode && editionMode.raw}
                        />
                    </div>
                );
            case "SELECT":
                return filter.length === 0 && defaultLabel && defaultKey ? (
                    <CreatableSelect
                        className="select"
                        classNamePrefix="react-select"
                        isMulti
                        isClearable
                        menuIsOpen={isMenuOpen}
                        onClick={(newValue, actionMeta) => {
                            submit(actionMeta, "SELECT");
                        }}
                        onChange={(newValue, actionMeta) => {
                            submit(actionMeta, "SELECT");
                        }}
                        onInputChange={(inputValue) => {
                            setCreateField(inputValue);
                        }}
                        options={currentOption.map((option) => ({
                            ...option,
                            label: t(option.label),
                        }))}
                        onFocus={() => setIsMenuOpen(true)}
                        components={{MultiValueContainer}}
                        placeholder={t("filter.search.select")}
                        value={!noMultiValues ? selected : []}
                        isLoading={isLoading}
                        styles={customStyles(theme, noSaved)}
                        theme={(selectTheme) => ({
                            ...selectTheme,
                            colors: {
                                ...selectTheme.colors,
                                neutral0: theme.palette.background.paper,
                                neutral50: theme.palette.text.primary,
                            },
                        })}
                        ref={(ref) => {
                            if (ref) {
                                selectRef.current = ref;
                            }
                        }}
                        formatCreateLabel={(search) => {
                            return (
                                <div className={classes.formatCreateLabel}>
                                    <Icon size={18}>Search</Icon>Search for this text: {search}
                                </div>
                            );
                        }}
                    />
                ) : (
                    <Select
                        placeholder={t("filter.search.select")}
                        value={!noMultiValues ? selected : []}
                        isMulti
                        isLoading={isLoading}
                        options={currentOption.map((option) => ({
                            ...option,
                            label: t(option.label),
                        }))}
                        onChange={(newValue, actionMeta) => submit(actionMeta, "SELECT")}
                        onClick={(newValue, actionMeta) => submit(actionMeta, "SELECT")}
                        menuIsOpen={isMenuOpen}
                        onFocus={() => setIsMenuOpen(true)}
                        onBlur={() => setIsMenuOpen(false)}
                        onMenuClose={() => setIsMenuOpen(false)}
                        components={{MultiValueContainer}}
                        styles={customStyles(theme, noSaved)}
                        theme={(selectTheme) => ({
                            ...selectTheme,
                            colors: {
                                ...selectTheme.colors,
                                neutral0: theme.palette.background.paper,
                                neutral50: theme.palette.text.primary,
                            },
                        })}
                        ref={(ref) => {
                            if (ref) {
                                selectRef.current = ref;
                            }
                        }}
                    />
                );
            case "USER":
                return (
                    <div id="select_user_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.user")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "USER");
                                closeMenuForce();
                            }}>
                            <AssignUser
                                assignees={assignees}
                                setAssignees={setAssignees}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "USER");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "TICKET":
                return (
                    <div id="select_ticket_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.ticket")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "TICKET");
                                closeMenuForce();
                            }}>
                            <AssignTicket
                                assignTicket={assignTicket}
                                setAssignTickets={setAssignTickets}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "TICKET");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "MODULE":
                return (
                    <div id="select_module_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.module")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "MODULE");
                                closeMenuForce();
                            }}>
                            <AssignModule
                                targetModule={assignModules}
                                setTargetModule={setAssignModules}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "MODULE");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "ENTITY":
                return (
                    <div id="select_entity_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.entity")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "ENTITY");
                                closeMenuForce();
                            }}>
                            <AssignEntity
                                cancelAutoClose
                                targetEntity={assignEntitys}
                                setTargetEntity={setAssignEntitys}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "ENTITY");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "FRAMEWORK":
                return (
                    <div id="select_framework_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.framework")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "FRAMEWORK");
                                closeMenuForce();
                            }}>
                            <AssignFramework
                                cancelAutoClose
                                targetFramework={assignFrameworks}
                                setTargetFramework={setAssignFrameworks}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "FRAMEWORK");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "TAXONOMY":
                return (
                    <div id="select_taxonomy_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.taxonomy")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "TAXONOMY");
                                closeMenuForce();
                            }}>
                            <AssignTaxonomy
                                cancelAutoClose
                                targetTaxonomy={assignTaxonomy}
                                setTargetTaxonomy={setAssignTaxonomy}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "TAXONOMY");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "SUPERVISOR":
                return (
                    <div id="select_supervisor_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.supervisor")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "SUPERVISOR");
                                closeMenuForce();
                            }}>
                            <AssignSupervisor
                                cancelAutoClose
                                targetSupervisor={assignSupervisor}
                                setTargetSupervisor={setAssignSupervisor}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "SUPERVISOR");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "CURRENCY":
                return (
                    <div id="select_currency_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.currency")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "CURRENCY");
                                closeMenuForce();
                            }}>
                            <AssignCurrency
                                cancelAutoClose
                                targetCurrency={assignCurrency}
                                setTargetCurrency={setAssignCurrency}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "CURRENCY");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "STATUS":
                return (
                    <div id="select_status_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.status")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "STATUS");
                                closeMenuForce();
                            }}>
                            <AssignStatus
                                cancelAutoClose
                                targetStatus={assignStatus}
                                setTargetStatus={setAssignStatus}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "STATUS");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "FREQUENCY":
                return (
                    <div id="select_frequency_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.frequency")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "FREQUENCY");
                                closeMenuForce();
                            }}>
                            <AssignFrequency
                                cancelAutoClose
                                targetFrequency={assignFrequency}
                                setTargetFrequency={setAssignFrequency}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "FREQUENCY");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            case "SOURCE_SYSTEM":
                return (
                    <div id="select_source_system_menu" className={classes.selectUser}>
                        <Input name="string" placeholder={t("filter.search.sourceSystem")} autoFocus />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => {
                                submit(null, "SOURCE_SYSTEM");
                                closeMenuForce();
                            }}>
                            <AssignSourceSystem
                                cancelAutoClose
                                targetSourceSystem={assignSourceSystem}
                                setTargetSourceSystem={setAssignSourceSystem}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => {
                                    submit(null, "SOURCE_SYSTEM");
                                    closeMenuForce();
                                }}
                            />
                        </Menu>
                    </div>
                );
            default:
                return <Error error={t("filter.search.error")} />;
        }
    };

    const scrollController = () => {
        const container = document.querySelector(".react-select__value-container");

        let scrollAmount = 0;

        if (container) {
            const slideTimer = setInterval(() => {
                container.scrollLeft += 20;
                scrollAmount += 10;
                if (scrollAmount >= 2000) {
                    window.clearInterval(slideTimer);
                }
            }, 1);
        }
    };

    if (noSaved) {
        return (
            <ClickAwayListener onClickAway={() => closeMenu()}>
                <div className={classes.selectNoSaved}>
                    <div className={classes.filterContainer}>{renderTypeInput(inputType)}</div>
                    {noMultiValues &&
                        selected &&
                        selected.map((select, index) => (
                            <Fragment key={`filterValue/${index}`}>
                                {renderValue(select, index)}
                                <Divider />
                            </Fragment>
                        ))}
                </div>
            </ClickAwayListener>
        );
    }

    return (
        <div className={classes.select}>
            {<RecentSearch setSelected={setSelected} />}
            <ClickAwayListener onClickAway={() => closeMenu()}>
                <div className={classes.filterContainer}>
                    {renderTypeInput(inputType)}
                    <div className={classes.saveButton} onClick={() => setOpenSaveFilter(true)}>
                        <Icon size={18}>Save</Icon>
                    </div>
                </div>
            </ClickAwayListener>
            <AddFilter openSaveFilter={openSaveFilter} setOpenSaveFilter={setOpenSaveFilter} selected={selected} />
        </div>
    );
};

const Filters = (props) => {
    const {t} = useTranslation();
    const filtersOption = props.filters.map((filter) => ({
        ...filter,
        value: filter.key,
    }));

    if (filtersOption && filtersOption.length > 0) {
        return <Search placeholder={t("filter.search.string")} {...props} filters={filtersOption} />;
    }

    return (
        <div className={props.classes.selectLoading}>
            <CustomSelect placeholder={t("filter.search.string")} isLoading={true} />
        </div>
    );
};

export default withStyles(SearchStyle)(Filters);
