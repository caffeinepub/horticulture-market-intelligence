import Map "mo:core/Map";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";

actor {
  module Alert {
    public func compare(a : Alert, b : Alert) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Mandi = {
    id : Nat;
    name : Text;
    locationZone : Text;
    distanceKm : Float;
    activeBuyers : Nat;
    specializations : [Text];
    demandLevel : Text;
  };

  type Alert = {
    id : Nat;
    farmerId : Nat;
    alertType : Text;
    cropName : Text;
    mandiName : Text;
    message : Text;
    timestamp : Int;
    isRead : Bool;
    channels : [Text];
  };

  let mandis = Map.empty<Nat, Mandi>();
  let alerts = Map.empty<Nat, Alert>();

  var nextMandiId = 0;
  var nextAlertId = 0;

  public shared ({ caller }) func addMandi(
    name : Text,
    locationZone : Text,
    distanceKm : Float,
    activeBuyers : Nat,
    specializations : [Text],
    demandLevel : Text,
  ) : async Nat {
    let id = nextMandiId;
    let mandi : Mandi = {
      id;
      name;
      locationZone;
      distanceKm;
      activeBuyers;
      specializations;
      demandLevel;
    };
    mandis.add(id, mandi);
    nextMandiId += 1;
    id;
  };

  public shared ({ caller }) func addAlert(
    farmerId : Nat,
    alertType : Text,
    cropName : Text,
    mandiName : Text,
    message : Text,
    channels : [Text],
  ) : async Nat {
    let id = nextAlertId;
    let alert : Alert = {
      id;
      farmerId;
      alertType;
      cropName;
      mandiName;
      message;
      timestamp = Time.now();
      isRead = false;
      channels;
    };
    alerts.add(id, alert);
    nextAlertId += 1;
    id;
  };

  public query ({ caller }) func getMandisByCrop(_crop : Text) : async [Mandi] {
    mandis.values().toArray();
  };

  public query ({ caller }) func getAlertsForFarmer(farmerId : Nat) : async [Alert] {
    let alertsIter = alerts.values();
    Array.fromIter(
      alertsIter.filter(
        func(a) { a.farmerId == farmerId }
      )
    );
  };
};
