import React, {Fragment} from "react";
import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";

const Action = (onClose, key) => (
    <Fragment>
        <Button color="transparent" iconSmall noMargin onClick={() => onClose(key)}>
            <Icon size={10} color="white">
                Close
            </Icon>
        </Button>
    </Fragment>
);

export default Action;
