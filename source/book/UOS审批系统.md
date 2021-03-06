# 第6章 UOS审批系统

为了满足更多企业的需求，提供更具定制化的产品，我们推出了审批系统。审批系统主要是针对传统企业开发的一套系统，旨在帮助企业更有效的管理资源。

#### 审批流程与标准OpenStack资源建立的流程有何不同？

在**标准流程**中，OpenStack的资源是由用户自主创建的，用户只要有足够的配额，可以任意的创建资源，一旦创建成功，资源马上对用户可见。    

在**审批流程**中，普通用户不能自主创建相关的资源，只能**申请**资源。资源只有通过了申请，才能创建。

### 帐户体系

审批系统可自定义**权限分级**：

*例：*

每个部门为一个**项目**，项目对应OpenStack里面的**Project**概念，用来隔离资源。

每个部门的**普通员工**都在同一个项目当中，角色为**member**。拥有的权限是查看，操作该项目的资源，申请资源。

每个部门的**leader**在此部门的项目当中的角色为**owner**。拥有的权限是查看，操作该项目的资源，申请资源，批准申请。

**IT部门的员工**则为OpenStack **平台管理员**，拥有**admin**权限。可自行创建资源。

### 审批流程

部门普通员工提交资源申请，提交后，申请发给部门领导。

部门领导收到申请，可以同意或者拒绝，若同意，则申请发给IT部门管理员。

IT部门管理员收到申请，可以同意或者拒绝，若同意，则平台自动创建资源。

### 生命周期

**申请资源**

在这个阶段，用户填写需要的资源以及数量。以及一些额外的需求：比如将该资源加入某些目标网络，为资源分配指定的公网IP等等。

**发送申请**

用户填写完申请单以后，会向指定的目标发起这个申请。申请的目标由系统管理员配置。一般会分**多级**，包括该申请者的若干上级领导，租户以及集群的管理员。
这个时候，目标管理员就能够看到该申请单，并且可以开始处理这个申请单。

**处理申请**

这个阶段中，处理人并不需要做任何API层面的操作。在这个阶段中，申请人可以修改这个申请。当申请人修改以及沟通完毕以后，处理人可以直接通过该申请，以及拒绝该申请。
某一阶段的申请人申请通过申请单以后，会根据具体配置，由系统决定是否向下一审批目标继续提交申请。

一旦**全部的审批目标**审批通过，即进入后续处理状态。
一旦其中的某一个审批目标拒绝了该申请，申请会被**驳回**，用户需要提交新的申请。（*注意：这个时候用户必须从第一个审批对象开始提交审批。*）

**后续处理**    

在审批处理完成以后，会进行后续的处理：

1. 自动完成：一旦管理员操作完成，系统会对该申请**自动创建**资源。

2. 手动创建：如果有系统无法自动创建的资源，则由管理员**手动创建**。


*审批系统增加了企业对产品的可控性，为企业对产品的管理提供了极大的便利。*


*__备注：__*

> *1.UOS审批平台所有ID均可复制；*

> *2.UOS审批平台新增功能：**云主机操作日志**。具体操作见下方*
