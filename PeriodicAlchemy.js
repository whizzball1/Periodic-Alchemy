var player = {
    upQuarkClicks: 0,
    electronClicks: 0,
    downQuarkClicks: 0,
    auto_up_quark_clicks: 0,
    auto_electron_clicks: 0,
    auto_down_quark_clicks: 0,
    auto_proton_clicks: 0,
    auto_neutron_clicks: 0,
    up_quark_click_cost: 15,
    electron_click_cost: 15,
    down_quark_click_cost: 15,
    proton_click_cost: 15,
    neutron_click_cost: 15,
    upgrade_up_quark_1_cost: 50,
    upgrade_electron_1_cost: 50,
    upgrade_down_quark_1_cost: 50,
    auto_up_quark_clicks_amount: 1,
    auto_electron_clicks_amount: 1,
    auto_down_quark_clicks_amount: 1,
    auto_proton_clicks_amount: 1,
    auto_neutron_clicks_amount: 1,
    upgrade_up_quark_click_1_bought: "False",
    upgrade_electron_click_1_bought: "False",
    upgrade_down_quark_click_1_bought: "False",
    proton_up_quark_cost: 2,
    proton_down_quark_cost: 1,
    neutron_up_quark_cost: 1,
    neutron_down_quark_cost: 2,
    protonClicks: 0,
    neutronClicks: 0,
    hydrogen2DeuteriumClicks: 0,
    hydrogen1ProtiumClicks: 0,
    hydrogen3TritiumClicks: 0,
    helium3Clicks: 0,
    helium4Clicks: 0,
    lithium6Clicks: 0,
    lithium7Clicks: 0,
    hydrogen_2_discovered: "false",
    hydrogen_1_discovered: "false",
    hydrogen_3_discovered: "false",
    helium_3_discovered: "false",
    helium_4_discovered: "false",
    lithium_6_discovered: "false",
    lithium_7_discovered: "false"
};

function set_cookie(cookie_name, value) {
    expiry = new Date();
    expiry.setTime(new Date().getTime() + (10 * 60 * 1000));
    var c_value = escape(btoa(JSON.stringify(value))) +
        "; expires=" + expiry.toUTCString();
    document.cookie = cookie_name + "=" + c_value;
}

function get_cookie(cookie_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + cookie_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(cookie_name + "=");
    }
    if (c_start == -1) return false;
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
        c_end = c_value.length;
    }
    c_value = atob(unescape(c_value.substring(c_start, c_end)));
    return JSON.parse(c_value);
}

function update_view() {
    update_total_clicks();
    var eUpQuarkAutoText1 = document.getElementById("upgrade_up_quark_click_1_text");
    if (player.upgrade_up_quark_click_1_bought == "True") {
        eUpQuarkAutoText1.innerHTML = "Double Up: US's make 2 up quarks per second. Already upgraded.";
    }
    var eElectronAutoText1 = document.getElementById("upgrade_electron_click_1_text");
    if (player.upgrade_electron_click_1_bought == "True") {
        eElectronAutoText1.innerHTML = "Can You Believe It's Fundamental?: ES's make 2 protons per second. Already upgraded.";
    }
    var eDownQuarkAutoText1 = document.getElementById("upgrade_down_quark_click_1_text");
    if (player.upgrade_down_quark_click_1_bought == "True") {
        eDownQuarkAutoText1.innerHTML = "Down and Out and In Again: DS's make 2 down quarks per second. Already upgraded.";
    }
    var eUpQuarkClickText = document.getElementById("buy_up_quark_click");
    eUpQuarkClickText.innerHTML = "Buy an up quark synthesiser for " + player.up_quark_click_cost + " up quarks";
    var eElectronClickText = document.getElementById("buy_electron_click");
    eElectronClickText.innerHTML = "Buy an electron synthesiser for " + player.electron_click_cost + " electrons";
    var eDownQuarkClickText = document.getElementById("buy_down_quark_click");
    eDownQuarkClickText.innerHTML = "Buy a down quark synthesiser for " + player.down_quark_click_cost + " down quarks";
    var eHydrogen2 = document.getElementById("hydrogen_2_deuterium_name");
    if (player.hydrogen_2_discovered == "true") {
        eHydrogen2.innerHTML = "Hydrogen-2 (Deuterium) (1 Proton, 1 Neutron, 1 Electron): ";
    }
    var eHydrogen1 = document.getElementById("hydrogen_1_protium_name");
    if (player.hydrogen_1_discovered == "true") {
        eHydrogen1.innerHTML = "Hydrogen-1 (Protium) (1 Proton, 1 Electron): ";
    }
    var eHydrogen3 = document.getElementById("hydrogen_3_tritium_name");
    if (player.hydrogen_3_discovered == "true") {
        eHydrogen3.innerHTML = "Hydrogen-3 (Tritium) (1 Proton, 2 Neutrons, 1 Electron): ";
    }
    var eHelium3 = document.getElementById("helium_3_name");
    if (player.helium_3_discovered == "true") {
        eHelium3.innerHTML = "Helium-3 (2 Protons, 1 Neutron, 2 Electrons): ";
    }
    var eHelium4 = document.getElementById("helium_4_name");
    if (player.helium_4_discovered == "true") {
        eHelium4.innerHTML = "Helium-4 (2 Protons, 2 Neutrons, 2 Electrons): ";
    }
    var eLithium6 = document.getElementById("lithium_6_name");
    if (player.lithium_6_discovered == "true") {
        eLithium6.innerHTML = "Lithium-6 (3 Protons, 3 Neutrons, 3 Electrons): ";
    }
    var eLithium7 = document.getElementById("lithium_7_name");
    if (player.lithium_7_discovered == "true") {
        eLithium7.innerHTML = "Lithium-7 (3 Protons, 4 Neutrons, 3 Electrons): ";
    }
}

function update_total_clicks() {
    var eUpQuark = document.getElementById("total_up_quark_clicks");
    eUpQuark.innerHTML = player.upQuarkClicks;
    var eElectron = document.getElementById("total_electron_clicks");
    eElectron.innerHTML = player.electronClicks;
    var eDownQuark = document.getElementById("total_down_quark_clicks");
    eDownQuark.innerHTML = player.downQuarkClicks;
    var eUpQuarkPerSecond = document.getElementById("up_quarks_per_second");
    eUpQuarkPerSecond.innerHTML = player.auto_up_quark_clicks;
    var eElectronPerSecond = document.getElementById("electrons_per_second");
    eElectronPerSecond.innerHTML = player.auto_electron_clicks;
    var eDownQuarkPerSecond = document.getElementById("down_quarks_per_second");
    eDownQuarkPerSecond.innerHTML = player.auto_down_quark_clicks;
    var eProtonPerSecond = document.getElementById("protons_per_second");
    eProtonPerSecond.innerHTML = player.auto_proton_clicks;
    var eNeutronPerSecond = document.getElementById("neutrons_per_second");
    eNeutronPerSecond.innerHTML = player.auto_neutron_clicks;
    var eProton = document.getElementById("total_protons");
    eProton.innerHTML = player.protonClicks;
    var eNeutron = document.getElementById("total_neutrons");
    eNeutron.innerHTML = player.neutronClicks;
    var eHydrogen2 = document.getElementById("hydrogen_2_deuterium_count");
    eHydrogen2.innerHTML = player.hydrogen2DeuteriumClicks;
    var eHydrogen1 = document.getElementById("hydrogen_1_protium_count");
    eHydrogen1.innerHTML = player.hydrogen1ProtiumClicks;
    var eHydrogen3 = document.getElementById("hydrogen_3_tritium_count");
    eHydrogen3.innerHTML = player.hydrogen3TritiumClicks;
    var eHelium3 = document.getElementById("helium_3_count");
    eHelium3.innerHTML = player.helium3Clicks;
    var eHelium4 = document.getElementById("helium_4_count");
    eHelium4.innerHTML = player.helium4Clicks;
    var eLithium6 = document.getElementById("lithium_6_count");
    eLithium6.innerHTML = player.lithium6Clicks;
    var eLithium7 = document.getElementById("lithium_7_count");
    eLithium7.innerHTML = player.lithium7Clicks;
}
document.getElementById("up_quark").onclick = function () {
    player.upQuarkClicks++;
    update_total_clicks();
};
document.getElementById("electron").onclick = function () {
    player.electronClicks++;
    update_total_clicks();
};
document.getElementById("down_quark").onclick = function () {
    player.downQuarkClicks++;
    update_total_clicks();
};
document.getElementById("buy_up_quark_click").onclick = function () {
    if (player.upQuarkClicks < player.up_quark_click_cost) {
        return;
    }
    player.auto_up_quark_clicks = player.auto_up_quark_clicks + player.auto_up_quark_clicks_amount;
    player.upQuarkClicks -= player.up_quark_click_cost;
    player.up_quark_click_cost = player.up_quark_click_cost * 1.25;
    player.up_quark_click_cost = Math.round(player.up_quark_click_cost);
    var e = document.getElementById("up_quarks_per_second");
    e.innerHTML = player.auto_up_quark_clicks;
    var eTwo = document.getElementById("buy_up_quark_click");
    eTwo.innerHTML = "Buy an up quark synthesiser for " + player.up_quark_click_cost + " up quarks";
    update_total_clicks();
};
document.getElementById("buy_electron_click").onclick = function () {
    if (player.electronClicks < player.electron_click_cost) {
        return;
    }
    player.auto_electron_clicks = player.auto_electron_clicks + player.auto_electron_clicks_amount;
    player.electronClicks -= player.electron_click_cost;
    player.electron_click_cost = player.electron_click_cost * 1.25;
    player.electron_click_cost = Math.round(player.electron_click_cost);
    var e = document.getElementById("electrons_per_second");
    e.innerHTML = player.auto_electron_clicks;
    var e2 = document.getElementById("buy_electron_click");
    e2.innerHTML = 'Buy an electron synthesiser for ' + player.electron_click_cost + " electrons";
    update_total_clicks();
};
document.getElementById("buy_down_quark_click").onclick = function () {
    if (player.downQuarkClicks < player.down_quark_click_cost) {
        return;
    }
    player.auto_down_quark_clicks = player.auto_down_quark_clicks + player.auto_down_quark_clicks_amount;
    player.downQuarkClicks -= player.down_quark_click_cost;
    player.down_quark_click_cost = player.down_quark_click_cost * 1.25;
    player.down_quark_click_cost = Math.round(player.down_quark_click_cost);
    var e = document.getElementById("down_quarks_per_second");
    e.innerHTML = player.auto_down_quark_clicks;
    var eTwo = document.getElementById("buy_down_quark_click");
    eTwo.innerHTML = "Buy a down quark synthesiser for " + player.down_quark_click_cost + " down quarks";
    update_total_clicks();
};
document.getElementById("buy_proton_click").onclick = function () {
    if (player.protonClicks < player.proton_click_cost) {
        return;
    }
    player.auto_proton_clicks = player.auto_proton_clicks + player.auto_proton_clicks_amount;
    player.protonClicks -= player.proton_click_cost;
    player.proton_click_cost = player.proton_click_cost * 1.25;
    player.proton_click_cost = Math.round(player.proton_click_cost);
    var e = document.getElementById("protons_per_second");
    e.innerHTML = player.auto_proton_clicks;
    var eTwo = document.getElementById("buy_proton_click");
    eTwo.innerHTML = "Buy a proton synthesiser for " + player.proton_click_cost + " protons";
    update_total_clicks();
};
document.getElementById("buy_neutron_click").onclick = function () {
    if (player.neutronClicks < player.neutron_click_cost) {
        return;
    }
    player.auto_neutron_clicks = player.auto_neutron_clicks + player.auto_neutron_clicks_amount;
    player.neutronClicks -= player.neutron_click_cost;
    player.neuron_click_cost = player.neutron_click_cost * 1.25;
    player.neutron_click_cost = Math.round(player.neutron_click_cost);
    var e = document.getElementById("neutrons_per_second");
    e.innerHTML = player.auto_neutron_clicks;
    var eTwo = document.getElementById("buy_neutron_click");
    eTwo.innerHTML = "Buy a neutron synthesiser for " + player.neutron_click_cost + " neutrons";
    update_total_clicks();
};
document.getElementById("upgrade_up_quark_click_1").onclick = function () {
    if (player.upgrade_up_quark_click_1_bought == "True") {
        return;
    }
    if (player.upQuarkClicks < player.upgrade_up_quark_1_cost) {
        return;
    }
    player.auto_up_quark_clicks = player.auto_up_quark_clicks * 2;
    player.auto_up_quark_clicks_amount = 2;
    player.upgrade_up_quark_click_1_bought = "True";
    player.upQuarkClicks -= 50;
    var e = document.getElementById("upgrade_up_quark_click_1_text")
    e.innerHTML = "Double Up: US's make 2 up quarks per second. Already upgraded."
};
document.getElementById("upgrade_electron_click_1").onclick = function () {
    if (player.upgrade_electron_click_1_bought == "True") {
        return;
    }
    if (player.electronClicks < player.upgrade_electron_1_cost) {
        return;
    }
    player.auto_electron_clicks = player.auto_electron_clicks * 2;
    player.auto_electron_clicks_amount = 2;
    player.upgrade_electron_click_1_bought = "True";
    player.electronClicks -= 50;
    var e = document.getElementById("upgrade_electron_click_1_text")
    e.innerHTML = "Can You Believe It's Fundamental?: ES's make 2 protons per second. Already upgraded."
};
document.getElementById("upgrade_down_quark_click_1").onclick = function () {
    if (player.upgrade_down_quark_click_1_bought == "True") {
        return;
    }
    if (player.downQuarkClicks < player.upgrade_down_quark_1_cost) {
        return;
    }
    player.auto_down_quark_clicks = player.auto_down_quark_clicks * 2;
    player.auto_down_quark_clicks_amount = 2;
    player.upgrade_down_quark_click_1_bought = "True";
    player.downQuarkClicks -= 50;
    var e = document.getElementById("upgrade_down_quark_click_1_text")
    e.innerHTML = "Down and Out and In Again: DS's make 2 down quarks per second. Already upgraded."
};

function save_game() {
    var save_data = btoa(JSON.stringify(player));
    prompt("To save your game, right click this string, select all, and copy it to your clipboard. Save it in another file.", save_data);
}

function load_game() {
    var save_data = prompt("Please enter your save key", "save key");
    save_data = JSON.parse(atob(save_data));
    playertest = save_data;
    if (typeof playertest.upQuarkClicks === 'undefined'
    update_view();
}
document.getElementById("load").onclick = function () {
    load_game();
};
document.getElementById("save").onclick = function () {
    save_game();
};
document.getElementById("proton").onclick = function () {
    if (player.upQuarkClicks < player.proton_up_quark_cost) {
        return;
    }
    if (player.downQuarkClicks < player.proton_down_quark_cost) {
        return;
    }
    player.upQuarkClicks -= player.proton_up_quark_cost;
    player.downQuarkClicks -= player.proton_down_quark_cost;
    player.protonClicks = player.protonClicks + 1;
    update_total_clicks();
};
document.getElementById("neutron").onclick = function () {
    if (player.upQuarkClicks < player.neutron_up_quark_cost) {
        return;
    }
    if (player.downQuarkClicks < player.neutron_down_quark_cost) {
        return;
    }
    player.upQuarkClicks -= player.neutron_up_quark_cost;
    player.downQuarkClicks -= player.neutron_down_quark_cost;
    player.neutronClicks = player.neutronClicks + 1;
    update_total_clicks();
};
document.getElementById("atom_recipe_unlock").onclick = function () {
    if (player.protonClicks < 10) {
        return;
    }
    if (player.neutronClicks < 10) {
        return;
    }
    if (player.electronClicks < 10) {
        return;
    }
    if (player.hydrogen_2_discovered == "false") {
        var eHydrogen2 = document.getElementById("hydrogen_2_deuterium_name");
        eHydrogen2.innerHTML = "Hydrogen-2 (Deuterium) (1 Proton, 1 Neutron, 1 Electron): ";
        player.protonClicks -= 10;
        player.neutronClicks -= 10;
        player.electronClicks -= 10;
        player.hydrogen_2_discovered = "true";
        return;
    }
    if (player.hydrogen_1_discovered == "false") {
        var eHydrogen1 = document.getElementById("hydrogen_1_protium_name");
        eHydrogen1.innerHTML = "Hydrogen-1 (Protium) (1 Proton, 1 Electron): ";
        player.protonClicks -= 10;
        player.neutronClicks -= 10;
        player.electronClicks -= 10;
        player.hydrogen_1_discovered = "true";
        return;
    }
    if (player.hydrogen_3_discovered == "false") {
        var eHydrogen3 = document.getElementById("hydrogen_3_tritium_name");
        eHydrogen3.innerHTML = "Hydrogen-3 (Tritium) (1 Proton, 2 Neutrons, 1 Electron): ";
        player.protonClicks -= 10;
        player.neutronClicks -= 10;
        player.electronClicks -= 10;
        player.hydrogen_3_discovered = "true";
        return;
    }
    if (player.helium_3_discovered == "false") {
        var eHelium3 = document.getElementById("helium_3_name");
        eHelium3.innerHTML = "Helium-3 (2 Protons, 1 Neutron, 2 Electrons): ";
        player.protonClicks -= 10;
        player.neutronClicks -= 10;
        player.electronClicks -= 10;
        player.helium_3_discovered = "true";
        return;
    }
    if (player.helium_4_discovered == "false") {
        var eHelium4 = document.getElementById("helium_4_name");
        eHelium4.innerHTML = "Helium-4 (2 Protons, 2 Neutron, 2 Electrons): ";
        player.protonClicks -= 10;
        player.neutronClicks -= 10;
        player.electronClicks -= 10;
        player.helium_4_discovered = "true";
        return;
    }
    if (player.lithium_6_discovered == "false") {
        var eLithium6 = document.getElementById("lithium_6_name");
        eLithium6.innerHTML = "Lithium-6 (3 Protons, 3 Neutrons, 3 Electrons): ";
        player.protonClicks -= 10;
        player.neutronClicks -= 10;
        player.electronClicks -= 10;
        player.lithium_6_discovered = "true";
        return;
    }
    if (player.lithium_7_discovered == "false") {
        var eLithium7 = document.getElementById("lithium_7_name");
        eLithium7.innerHTML = "Lithium-6 (3 Protons, 4 Neutrons, 3 Electrons): ";
        player.protonClicks -= 10;
        player.neutronClicks -= 10;
        player.electronClicks -= 10;
        player.lithium_7_discovered = "true";
        return;
    }
};
document.getElementById("atom_creator").onclick = function () {
    var eProtons = document.getElementById("protons_in_atom");
    player.temp_protons_in_atom = eProtons.options[eProtons.selectedIndex].text;
    var eNeutrons = document.getElementById("neutrons_in_atom");
    player.temp_neutrons_in_atom = eNeutrons.options[eNeutrons.selectedIndex].text;
    var eElectrons = document.getElementById("electrons_in_atom");
    player.temp_electrons_in_atom = eElectrons.options[eElectrons.selectedIndex].text;
    if (player.temp_protons_in_atom > player.protonClicks) {
        return;
    }
    if (player.temp_neutrons_in_atom > player.neutronClicks) {
        return;
    }
    if (player.temp_electrons_in_atom > player.electronClicks) {
        return;
    }
    if (player.temp_protons_in_atom == 1 && player.temp_neutrons_in_atom == 1 && player.temp_electrons_in_atom == 1) {
        player.hydrogen2DeuteriumClicks++;
        var eHydrogen2DeuteriumName = document.getElementById("hydrogen_2_deuterium_name");
        eHydrogen2DeuteriumName.innerHTML = "Hydrogen-2 (Deuterium) (1 Proton, 1 Neutron, 1 Electron): ";
        var eHydrogen2DeuteriumCount = document.getElementById("hydrogen_2_deuterium_count");
        eHydrogen2DeuteriumCount.innerHTML = player.hydrogen2DeuteriumClicks;
        player.protonClicks -= player.temp_protons_in_atom;
        player.neutronClicks -= player.temp_neutrons_in_atom;
        player.electronClicks -= player.temp_electrons_in_atom;
        player.hydrogen_2_discovered = "true";
    }
    if (player.temp_protons_in_atom == 1 && player.temp_neutrons_in_atom == 0 && player.temp_electrons_in_atom == 1) {
        player.hydrogen1ProtiumClicks++;
        var eHydrogen1ProtiumName = document.getElementById("hydrogen_1_protium_name");
        eHydrogen1ProtiumName.innerHTML = "Hydrogen-1 (Protium) (1 Proton, 1 Electron): ";
        var eHydrogen1ProtiumCount = document.getElementById("hydrogen_1_protium_count");
        eHydrogen1ProtiumCount.innerHTML = player.hydrogen1ProtiumClicks;
        player.protonClicks -= player.temp_protons_in_atom;
        player.neutronClicks -= player.temp_neutrons_in_atom;
        player.electronClicks -= player.temp_electrons_in_atom;
        player.hydrogen_1_discovered = "true";
    }
    if (player.temp_protons_in_atom == 2 && player.temp_neutrons_in_atom == 1 && player.temp_electrons_in_atom == 2) {
        player.helium3Clicks++;
        var eHelium3Name = document.getElementById("helium_3_name");
        eHelium3Name.innerHTML = "Helium-3 (2 Protons, 1 Neutron, 2 Electrons): ";
        var eHelium3Count = document.getElementById("helium_3_count");
        eHelium3Count.innerHTML = player.helium3Clicks;
        player.protonClicks -= player.temp_protons_in_atom;
        player.neutronClicks -= player.temp_neutrons_in_atom;
        player.electronClicks -= player.temp_electrons_in_atom;
        player.helium_3_discovered = "true";
    }
    if (player.temp_protons_in_atom == 2 && player.temp_neutrons_in_atom == 2 && player.temp_electrons_in_atom == 2) {
        player.helium4Clicks++;
        var eHelium4Name = document.getElementById("helium_4_name");
        eHelium4Name.innerHTML = "Helium-4 (2 Protons, 2 Neutrons, 2 Electrons): ";
        var eHelium4Count = document.getElementById("helium_4_count");
        eHelium4Count.innerHTML = player.helium4Clicks;
        player.protonClicks -= player.temp_protons_in_atom;
        player.neutronClicks -= player.temp_neutrons_in_atom;
        player.electronClicks -= player.temp_electrons_in_atom;
        player.helium_4_discovered = "true";
    }
    if (player.temp_protons_in_atom == 3 && player.temp_neutrons_in_atom == 3 && player.temp_electrons_in_atom == 3) {
        player.lithium6Clicks++;
        var eLithium6Name = document.getElementById("lithium_6_name");
        eLithium6Name.innerHTML = "Lithium-6 (3 Protons, 3 Neutrons, 3 Electrons): ";
        var eLithium6Count = document.getElementById("lithium_6_count");
        eLithium6Count.innerHTML = player.lithium6Clicks;
        player.protonClicks -= player.temp_protons_in_atom;
        player.neutronClicks -= player.temp_neutrons_in_atom;
        player.electronClicks -= player.temp_electrons_in_atom;
        player.lithium_6_discovered = "true";
    }
    if (player.temp_protons_in_atom == 3 && player.temp_neutrons_in_atom == 4 && player.temp_electrons_in_atom == 3) {
        player.lithium7Clicks++;
        var eLithium7Name = document.getElementById("lithium_7_name");
        eLithium7Name.innerHTML = "Lithium-7 (3 Protons, 4 Neutrons, 3 Electrons): ";
        var eLithium7Count = document.getElementById("lithium_7_count");
        eLithium7Count.innerHTML = player.lithium7Clicks;
        player.protonClicks -= player.temp_protons_in_atom;
        player.neutronClicks -= player.temp_neutrons_in_atom;
        player.electronClicks -= player.temp_electrons_in_atom;
        player.lithium_7_discovered = "true";
    }
    if (player.temp_protons_in_atom == 1 && player.temp_neutrons_in_atom == 2 && player.temp_electrons_in_atom == 1) {
        player.hydrogen3TritiumClicks++;
        var eHydrogen3TritiumName = document.getElementById("hydrogen_3_tritium_name");
        eHydrogen3TritiumName.innerHTML = "Hydrogen-3 (Tritium) (1 Proton, 2 Neutrons, 1 Electron): ";
        var eHydrogen3TritiumCount = document.getElementById("hydrogen_3_tritium_count");
        eHydrogen3TritiumCount.innerHTML = player.hydrogen3TritiumClicks;
        player.protonClicks -= player.temp_protons_in_atom;
        player.neutronClicks -= player.temp_neutrons_in_atom;
        player.electronClicks -= player.temp_electrons_in_atom;
        player.hydrogen_3_discovered = "true";
        setTimeout(function () {
            alert("I don't believe you really waited this long. In fact, this alert is only here because I know that someone's going to look at the code and find it. I'm not even going to make anything else. Hullo, future code reader!")
        }, 388789632000);
    }
};
setInterval(function () {
    player.upQuarkClicks += player.auto_up_quark_clicks;
    player.electronClicks += player.auto_electron_clicks;
    player.downQuarkClicks += player.auto_down_quark_clicks;
    if (player.upQuarkClicks >= player.auto_proton_clicks * 2 && player.downQuarkClicks >= player.auto_proton_clicks) {
        player.upQuarkClicks -= player.auto_proton_clicks * 2;
        player.downQuarkClicks -= player.auto_proton_clicks;
        player.protonClicks += player.auto_proton_clicks;
    }
    if (player.downQuarkClicks >= player.auto_neutron_clicks * 2 && player.upQuarkClicks >= player.auto_neutron_clicks) {
        player.downQuarkClicks -= player.auto_neutron_clicks * 2;
        player.upQuarkClicks -= player.auto_neutron_clicks;
        player.neutronClicks += player.auto_neutron_clicks;
    }
    update_total_clicks();
}, 1000);